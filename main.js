const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false
  });

  // Load the React app
  if (isDev) {
    // In development, load from Vite dev server
    const tryLoadReactApp = async () => {
      try {
        await mainWindow.loadURL('http://localhost:5173');
      } catch (error) {
        try {
          await mainWindow.loadURL('http://localhost:5174');
        } catch (error2) {
          mainWindow.loadURL('data:text/html,<h1>Please start the React dev server with: npm run dev</h1>');
        }
      }
    };
    
    tryLoadReactApp();
  } else {
    // In production, load the built React app
    mainWindow.loadFile('dist/index.html');
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
