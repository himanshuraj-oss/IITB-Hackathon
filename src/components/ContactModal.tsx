"use client";

export default function ContactModal() {
  return (
    <div id="contact-modal" className="fixed inset-0 z-[9999] bg-[#101016]/80 backdrop-blur-sm hidden items-center justify-center p-4">
      <div className="bg-[#172B36] border border-white/10 p-8 rounded-2xl w-full max-w-md relative shadow-2xl">
        <button 
          onClick={(e) => {
            const target = e.currentTarget.closest('#contact-modal') as HTMLElement;
            if (target) {
              const anim = target.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
              anim.onfinish = () => target.style.display = 'none';
            }
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <span className="text-white font-mono text-xl leading-none">&times;</span>
        </button>
        
        <h3 className="text-2xl font-mono font-bold text-arctic-powder mb-2">Let's Talk</h3>
        <p className="text-sm text-arctic-powder/60 font-sans mb-6">Our team will get back to you within 24 hours to discuss your enterprise requirements.</p>
        
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
          <input type="email" placeholder="work@email.com" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-arctic-powder font-sans outline-none focus:border-deep-saffron/50 transition-colors" />
          <textarea placeholder="How can we help you scale?" rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-arctic-powder font-sans outline-none focus:border-deep-saffron/50 transition-colors resize-none"></textarea>
          <button type="submit" className="w-full py-3 rounded-md bg-deep-saffron text-oceanic-noir font-mono font-bold hover:bg-forsythia transition-colors duration-200 mt-2">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
