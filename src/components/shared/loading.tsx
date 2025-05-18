export function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] items-center justify-center h-screen w-screen bg-white">
      <div className=" absolute left-1/2 -ml-6 top-1/2  animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>
  );
}
