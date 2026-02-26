"use client";

export default function Loading() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-background"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <img
        src="/logo.png"
        alt="Loading..."
        className="h-20 w-20 object-contain animate-pulse"
      />
    </div>
  );
}
