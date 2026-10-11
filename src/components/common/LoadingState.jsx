export default function LoadingState() {
  return (
    <div
      className="loading-state"
      role="status"
      aria-live="polite"
    >
      <span className="loading-spinner" />
      <p>Loading products...</p>
    </div>
  );
}