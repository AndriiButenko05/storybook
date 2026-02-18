"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
} from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
}
const icons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
};
const typeStyles: Record<ToastType, string> = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50   border-red-200   text-red-800",
  warning: "bg-amber-50  border-amber-200  text-amber-800",
  info: "bg-blue-50   border-blue-200   text-blue-800",
};
export const Toast = ({
  message,
  type = "info",
  duration = 3000,
  closable = true,
  onClose,
}: ToastProps) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 350);
  };

  useEffect(() => {
    if (duration === 0) return;
    timerRef.current = setTimeout(dismiss, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, dismiss]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={[
        "flex items-start gap-3 min-w-[280px] max-w-[380px]",
        "px-4 py-3 rounded-xl border shadow-lg",
        "text-sm font-medium",
        typeStyles[type],
        "transition-all duration-300 ease-out",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
      ].join(" ")}
    >
      <span className="mt-0.5">{icons[type]}</span>
      <span className="flex-1 leading-snug">{message}</span>
      {closable && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close notification"
          className="ml-1 -mr-1 -mt-0.5 p-1 rounded opacity-60 hover:opacity-100
            hover:bg-black/10 transition-opacity duration-100"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="w-3.5 h-3.5"
          >
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      )}
    </div>
  );
};
interface ToastItem extends ToastProps {
  id: string;
}

interface ToastContextValue {
  show: (props: Omit<ToastProps, "onClose">) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  show: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = (props: Omit<ToastProps, "onClose">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...props, id }]);
  };

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} onClose={() => remove(t.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
export const useToast = () => useContext(ToastContext);

export const ToastDemo = (props: ToastProps) => {
  const [key, setKey] = useState(0);
  const [show, setShow] = useState(false);

  const trigger = () => {
    setShow(false);
    setTimeout(() => {
      setKey((k) => k + 1);
      setShow(true);
    }, 50);
  };

  return (
    <div className="p-8">
      <button
        onClick={trigger}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm
          font-medium hover:bg-indigo-700 transition-colors"
      >
        Show Toast
      </button>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5">
        {show && <Toast key={key} {...props} onClose={() => setShow(false)} />}
      </div>
    </div>
  );
};
