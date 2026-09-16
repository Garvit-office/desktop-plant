import { useEffect, useState, type CSSProperties } from 'react';
import flowerImg from './assets/flower.png'; // Your photographic flower vine asset

type PlantType = 'vine' | 'blossom' | 'sunflower';

type Plant = {
  id: string;
  name: string;
  description: string;
  downloads: number;
  type: PlantType;
  installerUrl: string;
  color: string;
  tag: string;
};

const apiBase = import.meta.env.VITE_API_URL || '';
const installerUrl = import.meta.env.VITE_INSTALLER_URL
  || `${apiBase}/downloads/desktop-plant_0.1.0_x64-setup.exe`;

const plantsCatalog: Plant[] = [
  {
    id: 'neon-pothos',
    name: 'Cascading Neon Pothos',
    description: 'A bright, trailing vine that makes your screen feel a little more alive.',
    downloads: 1420,
    type: 'vine',
    installerUrl,
    color: '#b6e36d',
    tag: 'Most adopted'
  },
  {
    id: 'sakura-blossom',
    name: 'Coral Rose Vine',
    description: 'Delicate climbing roses with a slow, calming sway for focused afternoons.',
    downloads: 980,
    type: 'blossom',
    installerUrl,
    color: '#f4a9ba',
    tag: 'New arrival'
  },
  {
    id: 'sunshine-sunflower',
    name: 'Sunshine Sunflower',
    description: 'A sunny desktop companion that turns toward your active window.',
    downloads: 2310,
    type: 'sunflower',
    installerUrl,
    color: '#f5c451',
    tag: 'Community favorite'
  }
];

function PlantArtwork({ type }: { type: PlantType }) {
  return (
    <div className={`plant-art plant-art--${type}`} aria-hidden="true">
      {/* Uses your actual photographic flower vine image instead of abstract shapes */}
      <img src={flowerImg} alt="Botanical Vine" className="card-photographic-vine" />
    </div>
  );
}

export default function PlantWebsite() {
  const [plants, setPlants] = useState(plantsCatalog);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch(`${apiBase}/api/stats`);
        if (!response.ok) return;
        const stats: Record<string, { downloads: number }> = await response.json();
        setPlants((currentPlants) => currentPlants.map((plant) => ({
          ...plant,
          downloads: stats[plant.id]?.downloads ?? plant.downloads
        })));
      } catch {
        // The catalog remains usable offline with its latest known counts.
      }
    };
    void loadStats();
  }, []);

  const handleDownload = async (plantId: string, installerUrl: string) => {
    setDownloadingId(plantId);

    try {
      await fetch(`${apiBase}/api/track-download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantId, timestamp: new Date().toISOString() })
      });
    } catch {
      // Downloading remains available when analytics is offline.
    }

    setPlants((currentPlants) => currentPlants.map((plant) => plant.id === plantId
      ? { ...plant, downloads: plant.downloads + 1 }
      : plant));
    window.location.assign(installerUrl);
    setDownloadingId(null);
  };

  return (
    <main className="marketplace-shell">
      <div className="top-rule" />
      <header className="site-header">
        <div className="brand-lockup"><span className="brand-mark">✦</span><span>DESKTOP GREENERY</span></div>
        <span className="availability"><span className="status-dot" /> Free for Windows & macOS</span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A little life for your workspace</p>
          <h1>Plants that live<br /><em>on your screen.</em></h1>
          <p className="hero-subtitle">Ultra-realistic desktop companions that grow from your top border, sway with the breeze, and make everyday work feel more human.</p>
          <div className="hero-meta"><span>↓ 4,710 adopted</span><span className="meta-divider" /><span>✦ Updated weekly</span></div>
        </div>
        <div className="hero-window" aria-hidden="true">
          <div className="window-bar"><span /><span /><span /><b>desktop / greenery</b></div>
          <div className="window-scene">
            <img src={flowerImg} alt="Hero Vine Preview" className="hero-photographic-preview" />
            <div className="hero-window-copy">make space<br /><i>for something<br />growing.</i></div>
          </div>
        </div>
      </section>

      <section className="catalog-section">
        <div className="section-heading"><div><p className="eyebrow">The collection</p><h2>Choose your companion</h2></div><span className="catalog-count">03 plants available</span></div>
        <div className="plant-grid">
        {plants.map((plant) => (
          <article className="plant-card" key={plant.id}>
            <div className="card-art" style={{ '--plant-accent': plant.color } as CSSProperties}>
              <span className="card-tag">{plant.tag}</span>
              <PlantArtwork type={plant.type} />
            </div>
            <div className="card-content">
              <p className="plant-kind">{plant.type === 'vine' ? 'Trailing plant' : plant.type === 'blossom' ? 'Flowering branch' : 'Flowering plant'}</p>
              <h3>{plant.name}</h3>
              <p className="plant-description">{plant.description}</p>
              <div className="card-footer">
                <span className="adoptions">↓ {plant.downloads.toLocaleString()} <small>adoptions</small></span>
                <button onClick={() => void handleDownload(plant.id, plant.installerUrl)} disabled={downloadingId === plant.id}>
                  {downloadingId === plant.id ? 'Downloading...' : 'Adopt plant ↙'}
                </button>
              </div>
            </div>
          </article>
        ))}
        </div>
      </section>
      <footer className="site-footer"><span>Desktop Greenery <b>·</b> made for slower screens</span><span>v1.0.0 <b>·</b> Open source</span></footer>
    </main>
  );
}