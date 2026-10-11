import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="error-state" role="alert">
      <AlertCircle size={28} />

      <h3>Unable to load products</h3>
      <p>{message}</p>

      {onRetry && (
        <button
          className="secondary-button"
          type="button"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          Try again
        </button>
      )}
    </div>
  );
}