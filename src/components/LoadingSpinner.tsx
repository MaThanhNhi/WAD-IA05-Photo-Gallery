/**
 * Loading spinner component
 * Presentational component for showing loading states
 */

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-3",
  lg: "w-16 h-16 border-4",
};

/**
 * Accessible loading spinner with optional text
 */
export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-8"
      role="status"
      aria-live="polite"
    >
      <div
        className={`${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
        aria-hidden="true"
      />
      {text && <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{text}</p>}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
