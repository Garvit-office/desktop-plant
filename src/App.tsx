import React, { useState, useEffect } from 'react';

export default function PlantWebsite() {
  const [plants, setPlants] = useState([
    {
      id: 'hanging-ivy-01',
      name: 'Hanging Ivy',
      description: 'A cozy green vine that drapes gracefully over your top screen border.',
      downloads: 1240,
      image: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
      installerUrl: 'https://github.com/your-username/desktop-plant/releases/download/v1.0.0/hanging-ivy_1.0.0_x64-setup.exe'
    },
    {
      id: 'sunflower-02',
      name: 'Bouncing Sunflower',
      description: 'Brightens up your bottom taskbar with a cheerful little sway.',
      downloads: 850,
      image: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
      installerUrl: 'https://github.com/your-username/desktop-plant/releases/download/v1.0.0/sunflower_1.0.0_x64-setup.exe'
    },
    {
      id: 'bonsai-03',
      name: 'Minimalist Bonsai',
      description: 'A calm, peaceful desktop companion that sits quietly in your corner.',
      downloads: 2100,
      image: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
      installerUrl: 'https://github.com/your-username/desktop-plant/releases/download/v1.0.0/bonsai_1.0.0_x64-setup.exe'
    }
  ]);

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Fetch live download / follower stats from your backend when the page mounts
  useEffect(() => {
    fetch('https://your-plant-website-backend.com/api/stats')
      .then(res => res.json())
      .then(data => {
        setPlants(prevPlants =>
          prevPlants.map(plant => ({
            ...plant,
            downloads: data[plant.id]?.downloads ?? plant.downloads
          }))
        );
      })
      .catch(() => console.log("Backend offline: using cached fallback stats"));
  }, []);

  const handleDownload = (plantId: string, installerUrl: string) => {
    setDownloadingId(plantId);

    // 1. Log download analytics and increase counter on your backend
    fetch('https://your-plant-website-backend.com/api/track-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plantId, timestamp: new Date().toISOString() })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Update local state to reflect the new download count immediately
          setPlants(prevPlants =>
            prevPlants.map(p => (p.id === plantId ? { ...p, downloads: data.downloads } : p))
          );
        }
      })
      .catch(() => console.log("Analytics network note: offline mode"));

    // 2. Trigger the direct installer file download
    setTimeout(() => {
      window.location.href = installerUrl;
      setDownloadingId(null);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f4', fontFamily: 'Arial, sans-serif', padding: '40px 20px' }}>
      {/* Header Section */}
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c4a3e', marginBottom: '10px' }}>🌿 Desktop Greenery</h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Bring your screen to life. Download animated plants that stick to your desktop borders.</p>
      </header>

      {/* Plant Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        {plants.map((plant) => (
          <div key={plant.id} style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8e2' }}>
            <div style={{ height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
              <img src={plant.image} alt={plant.name} style={{ maxHeight: '120px', objectFit: 'contain' }} />
            </div>
            
            <h3 style={{ fontSize: '1.3rem', color: '#2c4a3e', marginBottom: '8px' }}>{plant.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px', minHeight: '40px' }}>{plant.description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>📥 {plant.downloads} adoptions</span>
              
              <button 
                onClick={() => handleDownload(plant.id, plant.installerUrl)}
                disabled={downloadingId === plant.id}
                style={{
                  backgroundColor: downloadingId === plant.id ? '#94b4a3' : '#2c4a3e',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background 0.2s'
                }}
              >
                {downloadingId === plant.id ? 'Downloading...' : 'Download Plant'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}