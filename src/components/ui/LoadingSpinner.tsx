/**
 * Minimal loading indicator for asynchronous views.
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full" style={{ borderWidth: 2, borderStyle: 'solid', borderColor: 'rgba(11,11,11,0.12)', borderTopColor: 'var(--color-gold)' }} />
    </div>
  );
}
