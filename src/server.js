const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory database simulation (replace with MongoDB or PostgreSQL later)
let plantStats = {
  'hanging-ivy-01': { downloads: 1240 },
  'sunflower-02': { downloads: 850 },
  'bonsai-03': { downloads: 2100 }
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