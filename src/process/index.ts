import { app, BrowserWindow } from 'electron';
import serve from 'electron-serve';

const loadURL = serve({ directory: '.' });
const isDev = !app.isPackaged || process.env.NODE_ENV == 'development';

async function loadContentFromUrl(mainWindow: BrowserWindow, url: string) {
  return mainWindow.loadURL('http://localhost:3000').catch(() => {
    setTimeout(() => loadContentFromUrl(mainWindow, url), 1000);
  });
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Open the DevTools.
  if (isDev) {
    // loadContentFromUrl(mainWindow, 'http://localhost:3000');
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // mainWindow.removeMenu();
    loadURL(mainWindow);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
