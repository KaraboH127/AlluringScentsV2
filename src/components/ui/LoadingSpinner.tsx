/**
 * Minimal loading indicator for asynchronous views.
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2A2A2A] border-t-[#C9A227]" />
    </div>
  );
}
