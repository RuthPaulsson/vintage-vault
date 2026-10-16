// Shown while data is loading. The spinning film reel is made in CSS (.reel).
export default function Loader() {
  return (
    <div className="loader">
      <span className="reel" aria-hidden="true" />
      <p>Opening the vault…</p>
    </div>
  );
}
