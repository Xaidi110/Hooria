import { useState } from 'react';
import { Menu, X, ArrowUpRight, Award, Linkedin } from 'lucide-react';

interface HeaderProps {
  onOpenAudit: () => void;
}

export default function Header({ onOpenAudit }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-editorial-charcoal/10 bg-editorial-cream/90 backdrop-blur-md px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Editorial Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex flex-col text-left cursor-pointer focus:outline-none"
        >
          <span className="font-display text-xl md:text-2xl font-black text-editorial-charcoal tracking-tight leading-none uppercase">
            HOORIA KHAN
          </span>
          <span className="font-sans text-[9px] font-bold text-editorial-orange tracking-[3px] uppercase leading-none mt-1">
            Growth Architect
          </span>
        </button>

        {/* Editorial Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { id: 'services', label: 'Services' },
            { id: 'case-studies', label: 'Case Studies' },
            { id: 'thought-leadership', label: 'Insights' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-sans text-xs font-bold uppercase tracking-[2px] text-editorial-charcoal/70 transition-colors hover:text-editorial-orange cursor-pointer focus:outline-none"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/hooriakhan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal/60 hover:text-editorial-orange transition-colors"
          >
            <Linkedin className="h-4 w-4 text-editorial-charcoal/60 hover:text-editorial-orange transition-colors" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={onOpenAudit}
            className="inline-block px-5 py-2.5 bg-editorial-charcoal text-editorial-cream hover:bg-editorial-orange rounded-full font-sans font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-1">
              Free SEO Audit
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-editorial-charcoal/10 bg-white shadow-sm md:hidden cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-editorial-charcoal" /> : <Menu className="h-5 w-5 text-editorial-charcoal" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-[65px] z-40 border-b border-editorial-charcoal/10 bg-editorial-cream p-6 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {[
              { id: 'services', label: 'Services' },
              { id: 'case-studies', label: 'Case Studies' },
              { id: 'thought-leadership', label: 'Insights' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left font-sans text-xs font-bold uppercase tracking-[2px] text-editorial-charcoal border-b border-editorial-charcoal/5 pb-2 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-col gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/hooriakhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal/80"
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                LinkedIn
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full text-center rounded-full bg-editorial-charcoal hover:bg-editorial-orange py-3 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Run Free SEO Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
