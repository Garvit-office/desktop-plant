import './App.css';
import CompanionOverlay from './CompanionOverlay';
import PlantWebsite from './PlantWebsite';

const isTauriRuntime = '__TAURI_INTERNALS__' in window;

function App() {
  return isTauriRuntime ? <CompanionOverlay /> : <PlantWebsite />;
}

export default App;