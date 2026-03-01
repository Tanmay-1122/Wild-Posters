import { useState, useEffect, createContext, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] animate-slide-up">
                    <div className={`px-6 py-3 rounded-full shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-3 ${toast.type === 'success' ? 'bg-[#0a0a0a] text-white' : 'bg-red-600 text-white'
                        }`}>
                        <span className="material-symbols-outlined text-sm">
                            {toast.type === 'success' ? 'check_circle' : 'error'}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest">{toast.message}</span>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
