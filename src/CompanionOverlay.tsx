import flowerImg from './assets/flower.png';

export default function CompanionOverlay() {
  return (
    <main className="companion-app" aria-label="Desktop Greenery companion">
      <img className="companion-vine" src={flowerImg} alt="" />
    </main>
  );
}
