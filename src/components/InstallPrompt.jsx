import React, { useState, useEffect, useRef } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const promptRef = useRef(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);
    
    if (isIosDevice && !isInStandaloneMode) {
      setIsIOS(true);
      setTimeout(() => setShowPrompt(true), 3000);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      promptRef.current = e;
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 2000);
    };

    const handleManualTrigger = async () => {
      if (promptRef.current) {
        promptRef.current.prompt();
        const { outcome } = await promptRef.current.userChoice;
        if (outcome === 'accepted') {
          promptRef.current = null;
          setDeferredPrompt(null);
          setShowPrompt(false);
        }
      } else {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('trigger-pwa-install', handleManualTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('trigger-pwa-install', handleManualTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fade-in" style={{
      position: 'fixed', 
      bottom: '24px', 
      left: '50%', 
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)', 
      maxWidth: '420px', 
      padding: '16px 20px', 
      zIndex: 99999,
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      border: '1px solid var(--accent)',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(20, 20, 20, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
    }}>
       <div style={{ flex: 1 }}>
         <h4 style={{ margin: '0 0 4px', fontSize: '15px', color: 'var(--text)' }}>Install Vibe LMS</h4>
         <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: '1.4' }}>
           {isIOS 
              ? "Tap the Share icon bellow then 'Add to Home Screen' to install as a native app." 
              : "Add to home screen for lightning-fast quick access."}
         </p>
       </div>
       
       {!isIOS && (
         <button onClick={handleInstallClick} className="btn-accent" style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
           <Download size={14} />
           Install
         </button>
       )}
       
       <button onClick={() => setShowPrompt(false)} style={{ color: 'var(--muted)', display: 'flex', padding: '4px' }}>
         <X size={18} />
       </button>
    </div>
  );
}
