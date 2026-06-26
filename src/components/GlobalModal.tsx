"use client";
import { useEffect, useState } from "react";

type ModalType = 'contact' | 'checkout' | 'settings' | 'download' | null;

export default function GlobalModal() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [data, setData] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleOpen = (e: any) => {
      setModalType(e.detail.type);
      setData(e.detail.data || {});
      setTimeout(() => setIsVisible(true), 10);
    };
    window.addEventListener('open-modal', handleOpen);
    return () => window.removeEventListener('open-modal', handleOpen);
  }, []);

  const close = () => {
    setIsVisible(false);
    setTimeout(() => setModalType(null), 300);
  };

  if (!modalType) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#101016]/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-[#172B36] border border-white/10 p-8 rounded-2xl w-full max-w-md relative shadow-2xl transition-transform duration-300 ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'}`}>
        <button 
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <span className="text-white font-mono text-xl leading-none">&times;</span>
        </button>
        
        {modalType === 'contact' && (
          <>
            <h3 className="text-2xl font-mono font-bold text-arctic-powder mb-2">Contact Sales</h3>
            <p className="text-sm text-arctic-powder/60 font-sans mb-6">Our team will get back to you within 24 hours to discuss enterprise requirements.</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); close(); }}>
              <input type="email" placeholder="work@email.com" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-arctic-powder font-sans outline-none focus:border-deep-saffron/50 transition-colors" />
              <textarea placeholder="How can we help you scale?" rows={4} required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-arctic-powder font-sans outline-none focus:border-deep-saffron/50 transition-colors resize-none"></textarea>
              <button type="submit" className="w-full py-3 rounded-md bg-deep-saffron text-oceanic-noir font-mono font-bold hover:bg-forsythia transition-colors duration-200 mt-2">
                Send Message
              </button>
            </form>
          </>
        )}

        {modalType === 'checkout' && (
          <>
            <h3 className="text-2xl font-mono font-bold text-arctic-powder mb-2">Checkout: {data.tier || 'Starter'}</h3>
            <p className="text-sm text-arctic-powder/60 font-sans mb-6">Create your account to start building with Armory's neural engines.</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Account created!"); close(); }}>
              <input type="text" placeholder="Full Name" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-arctic-powder font-sans outline-none focus:border-deep-saffron/50 transition-colors" />
              <input type="email" placeholder="Email Address" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-arctic-powder font-sans outline-none focus:border-deep-saffron/50 transition-colors" />
              <button type="submit" className="w-full py-3 rounded-md bg-deep-saffron text-oceanic-noir font-mono font-bold hover:bg-forsythia transition-colors duration-200 mt-2">
                {data.isTrial ? 'Start Free Trial' : 'Continue to Payment'}
              </button>
            </form>
          </>
        )}

        {modalType === 'download' && (
          <>
            <h3 className="text-2xl font-mono font-bold text-arctic-powder mb-2">Download Case Study</h3>
            <p className="text-sm text-arctic-powder/60 font-sans mb-6">Enter your email to receive the full technical case study for {data.company || 'our clients'}.</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Case study sent to your email!"); close(); }}>
              <input type="email" placeholder="work@email.com" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-arctic-powder font-sans outline-none focus:border-deep-saffron/50 transition-colors" />
              <button type="submit" className="w-full py-3 rounded-md bg-deep-saffron text-oceanic-noir font-mono font-bold hover:bg-forsythia transition-colors duration-200 mt-2">
                Send to Email
              </button>
            </form>
          </>
        )}

        {modalType === 'settings' && (
          <>
            <h3 className="text-2xl font-mono font-bold text-arctic-powder mb-2">System Settings</h3>
            <p className="text-sm text-arctic-powder/60 font-sans mb-6">Manage your local viewing preferences and system performance.</p>
            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg cursor-pointer hover:border-mystic-mint/30 transition-colors">
                <span className="text-arctic-powder font-sans">Hardware Acceleration</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-deep-saffron" />
              </label>
              <label className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg cursor-pointer hover:border-mystic-mint/30 transition-colors">
                <span className="text-arctic-powder font-sans">Reduced Motion</span>
                <input type="checkbox" className="w-4 h-4 accent-deep-saffron" />
              </label>
              <button onClick={close} className="w-full py-3 rounded-md bg-white/10 text-arctic-powder font-mono font-bold hover:bg-white/20 transition-colors duration-200 mt-2">
                Save Preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
