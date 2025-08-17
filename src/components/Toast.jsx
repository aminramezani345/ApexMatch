import React, { createContext, useContext, useMemo, useState, useCallback } from "react";

const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((msg, type = "success", dur = 2500) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), dur);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-lg px-4 py-2 shadow ring-1 text-sm ${
              t.type === "error"
                ? "bg-rose-50 ring-rose-200 text-rose-700"
                : "bg-emerald-50 ring-emerald-200 text-emerald-700"
            }`}
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
