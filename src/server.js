import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const app = express();
const PORT = process.env.PORT || 5000;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const installerPath = process.env.INSTALLER_PATH || path.resolve(
  currentDirectory,
  '../src-tauri/target/release/bundle/nsis/desktop-plant_0.1.0_x64-setup.exe'
);

app.use(cors());
app.use(express.json());

app.get('/downloads/desktop-plant_0.1.0_x64-setup.exe', (_req, res) => {
  res.download(installerPath, 'desktop-plant_0.1.0_x64-setup.exe', (error) => {
    if (error && !res.headersSent) {
      res.status(error.code === 'ENOENT' ? 404 : 500).json({
        success: false,
        message: error.code === 'ENOENT'
          ? 'Installer is not available on this server yet.'
          : 'Installer download failed.'
      });
    }
  });
});

// In-memory database simulation (replace with MongoDB or PostgreSQL later)
let plantStats = {
  'neon-pothos': { downloads: 1420 },
  'sakura-blossom': { downloads: 980 },
  'sunshine-sunflower': { downloads: 2310 }
};

// Endpoint to track a download/adoption
app.post('/api/track-download', (req, res) => {
  const { plantId, timestamp } = req.body;
  
  if (plantStats[plantId]) {
    plantStats[plantId].downloads += 1;
    console.log(`[Download Tracked] Plant: ${plantId} at ${timestamp}`);
    return res.status(200).json({ success: true, downloads: plantStats[plantId].downloads });
  }
  
  res.status(404).json({ success: false, message: 'Plant not found' });
});

// Endpoint for your website to fetch live download / follower stats
app.get('/api/stats', (req, res) => {
  res.status(200).json(plantStats);
});

app.listen(PORT, () => {
  console.log(`Plant backend running on port ${PORT}`);
});