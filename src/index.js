const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let mainWindow;

async function createWindow() {
  const isDev = await import("electron-is-dev").then((mod) => mod.default);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../frontend/dist/index.html")}`;
  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => (mainWindow = null));

  // Remove default menu
  Menu.setApplicationMenu(null);

  // Open dev tools in a separate window when F12 is pressed
  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F12") {
      event.preventDefault();
      mainWindow.webContents.openDevTools({ mode: "detach" });
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
