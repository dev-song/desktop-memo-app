const { app, BrowserWindow, ipcMain } = require('electron');
const { saveMemo, readMemo } = require('./lib/crud');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  readMemo(memo => {
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('previous-memo-exists', memo);
    })
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
}

ipcMain.on('form-submission', (e, data) => {
  saveMemo(data);
})

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});