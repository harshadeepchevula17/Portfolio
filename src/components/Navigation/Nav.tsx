import { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { nav, profile } from "@/content/portfolio";

export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    nav.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      {/* Desktop pill navigation */}
      <nav
        aria-label="Primary"
        className="panel hidden items-center gap-1 rounded-full px-3 py-1.5 backdrop-blur-xl md:flex border border-border/80 bg-card/90 shadow-2xl"
      >
        <a
          href="#home"
          className="mr-2 font-display text-xs font-bold tracking-widest text-primary hover:text-foreground transition-colors"
        >
          HD.
        </a>
        <div className="h-4 w-px bg-border/60 mr-1" />
        {nav.map((n) => {
          const id = n.toLowerCase();
          const on = active === id;
          return (
            <a
              key={n}
              href={`#${id}`}
              className={`rounded-full px-3 py-1.5 font-display text-[11px] tracking-wider transition-all duration-200 ${
                on
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {n.toUpperCase()}
            </a>
          );
        })}
        <div className="h-4 w-px bg-border/60 ml-1 mr-1" />
        <a
          href={profile.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1 text-[11px] font-display font-medium text-foreground hover:bg-secondary transition-colors"
        >
          <FileText size={12} className="text-primary" />
          <span>RESUME</span>
        </a>
      </nav>

      {/* Mobile Bar */}
      <div className="flex w-full items-center justify-between md:hidden">
        <a
          href="#home"
          className="panel flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-bold tracking-wider text-primary"
        >
          <span>HD.</span>
          <span className="text-[10px] text-muted-foreground tracking-normal font-sans">FULL STACK</span>
        </a>
        <div className="flex items-center gap-2">
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="panel rounded-full p-2.5 text-xs text-primary"
            aria-label="Download Resume"
          >
            <FileText size={18} />
          </a>
          <button
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
            className="panel rounded-full p-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="panel absolute inset-x-4 top-16 grid grid-cols-2 gap-2 p-4 md:hidden border border-border bg-card/95 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {nav.map((n) => {
            const id = n.toLowerCase();
            const on = active === id;
            return (
              <a
                key={n}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 font-display text-xs font-medium tracking-wider transition-colors ${
                  on ? "bg-primary text-primary-foreground font-semibold" : "bg-secondary/70 text-foreground hover:bg-secondary"
                }`}
              >
                {n.toUpperCase()}
              </a>
            );
          })}
          <div className="col-span-2 pt-2 border-t border-border/50">
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/20 py-2.5 text-xs font-display font-bold tracking-wider text-primary border border-primary/30"
            >
              <FileText size={14} /> VIEW RESUME
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
