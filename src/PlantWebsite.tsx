import React, { useState } from 'react';

// Sample data for your plant catalog
const plantsCatalog = [
  {
    id: 'hanging-ivy-01',
    name: 'Hanging Ivy',
    description: 'A cozy green vine that drapes gracefully over your top screen border.',
    downloads: 1240,
    image: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
  },
  {
    id: 'sunflower-02',
    name: 'Bouncing Sunflower',
    description: 'Brightens up your bottom taskbar with a cheerful little sway.',
    downloads: 850,
    image: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif', // Replace with unique plant GIF
  },
  {
    id: 'bonsai-03',
    name: 'Minimalist Bonsai',
    description: 'A calm, peaceful desktop companion that sits quietly in your corner.',
    downloads: 2100,
    image: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif', // Replace with unique plant GIF
  }
];

export default function PlantWebsite() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (plantId: string, plantName: string) => {
    setDownloadingId(plantId);
    
    // Simulate triggering the installer download
    setTimeout(() => {
      alert(`Your download for "${plantName}" has started! Run the installer to stick it to your screen border.`);
      setDownloadingId(null);
    }, 1500);

    // Optional: Send analytics to your backend logging that a user clicked download
    /*
    fetch('https://your-plant-website-backend.com/api/log-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plantId })
    });
    */
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
        {plantsCatalog.map((plant) => (
          <div key={plant.id} style={{ background: '#white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8e2' }}>
            <div style={{ height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
              <img src={plant.image} alt={plant.name} style={{ maxHeight: '120px', objectFit: 'contain' }} />
            </div>
            
            <h3 style={{ fontSize: '1.3rem', color: '#2c4a3e', marginBottom: '8px' }}>{plant.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px', minHeight: '40px' }}>{plant.description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>📥 {plant.downloads} adoptions</span>
              
              <button 
                onClick={() => handleDownload(plant.id, plant.name)}
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
                {downloadingId === plant.id ? 'Preparing...' : 'Download Plant'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}