export default function Loader({ className }: { className?: string }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${className}`}
      />
    </div>
  );
}
