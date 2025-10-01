const { spawn } = require('child_process');
const http = require('http');

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForDevServer() {
  console.log('Waiting for React dev server...');
  
  while (true) {
    const port5173 = await checkPort(5173);
    const port5174 = await checkPort(5174);
    
    if (port5173) {
      console.log('React dev server found on port 5173');
      break;
    } else if (port5174) {
      console.log('React dev server found on port 5174');
      break;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Start Electron
  console.log('Starting Electron...');
  const electron = spawn('electron', ['.'], { stdio: 'inherit' });
  
  electron.on('close', (code) => {
    console.log(`Electron exited with code ${code}`);
    process.exit(code);
  });
}

waitForDevServer().catch(console.error);
