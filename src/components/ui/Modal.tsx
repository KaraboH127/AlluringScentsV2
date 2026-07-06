import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Generic modal shell retained for future interactions that require focused
 * confirmation/dialog flows.
 */
export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overlay-dark px-4" onClick={onClose}>
      <div className="w-full max-w-lg panel-surface p-6" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg site-heading">{title}</h3>
          <button onClick={onClose} className="text-sm uppercase tracking-[0.14em] text-muted">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
