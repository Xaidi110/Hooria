/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import AIAuditTool from './components/AIAuditTool';
import ThoughtLeadershipSection from './components/ThoughtLeadershipSection';
import ContactFooter from './components/ContactFooter';
import { ArrowUp, Sparkles, Star, TrendingUp, Compass } from 'lucide-react';

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tickerMessage, setTickerMessage] = useState('');

  // Handle showing Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up an active, ticking mock ticker at the very top of the screen (funky & alive!)
  useEffect(() => {
    const MESSAGES = [
      '🔥 Frankfurt Fintech scale-up just completed positioning recalibration sprint (+142% leads).',
      '🥨 Berlin e-commerce startup increased ad ROAS to 4.8x via custom checkout flow audits.',
      '🚀 Munich HR SaaS pivoted positioning to command 2.2x higher ACV enterprise contracts.',
      '✨ Get your direct brand positioning blueprint in 10s using our AI Growth Twin below.'
    ];
    let idx = 0;
    setTickerMessage(MESSAGES[0]);
    const interval = setInterval(() => {
      idx = (idx + 1) % MESSAGES.length;
      setTickerMessage(MESSAGES[idx]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToAudit = () => {
    const el = document.getElementById('audit-section-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-editorial-cream font-sans selection:bg-editorial-orange/20 selection:text-editorial-charcoal flex flex-col justify-between overflow-x-hidden">
      
      {/* Dynamic Editorial Live Ticker */}
      <div className="w-full bg-editorial-charcoal text-white border-b border-editorial-charcoal/10 py-2.5 px-4 overflow-hidden flex items-center gap-4">
        <div className="flex h-5 items-center gap-1.5 rounded-full bg-editorial-orange px-2.5 font-sans text-[9px] font-bold uppercase tracking-wider text-white shrink-0">
          <Star className="h-2.5 w-2.5 fill-current animate-pulse" />
          <span>LIVE METRICS</span>
        </div>
        <div className="font-mono text-[10px] sm:text-xs font-medium text-editorial-cream/80 transition-all truncate animate-fade-in">
          {tickerMessage}
        </div>
      </div>

      {/* Header component with callbacks */}
      <Header onOpenAudit={handleScrollToAudit} />

      {/* Hero component */}
      <Hero onOpenAudit={handleScrollToAudit} onScrollToSection={handleScrollToSection} />

      {/* Services offering block */}
      <ServicesSection onOpenAudit={handleScrollToAudit} />

      {/* Interactive portfolio/case study list */}
      <CaseStudiesSection />

      {/* Dedicated Centered Segment for the Gemini-Powered AI Growth Audit */}
      <section id="audit-section-anchor" className="bg-white pt-24 pb-24 mt-0 px-4 md:px-8 border-b border-editorial-charcoal/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-editorial-charcoal/10 bg-editorial-cream px-5 pt-2 pb-2 mt-10 font-sans text-[10px] font-bold uppercase tracking-widest text-editorial-charcoal shadow-sm">
            <Compass className="h-3.5 w-3.5 text-editorial-orange" />
            <span>Interactive Diagnostic Console</span>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl z-10">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="font-sans text-xs font-bold text-editorial-orange uppercase tracking-[3px] block mb-3">
              // POSITIONING SIMULATOR
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-editorial-charcoal tracking-tight leading-tight mt-1">
              Test Your Current Positioning.
            </h2>
            <p className="font-sans text-base text-editorial-charcoal/70 mt-3 leading-relaxed">
              Input your digital bottleneck below. Hooria’s strategy twin will diagnose your landing page copy and deliver customized conversion action items.
            </p>
          </div>

          <AIAuditTool />
        </div>
      </section>

      {/* Thought leadership hub articles list */}
      <ThoughtLeadershipSection />

      {/* Comprehensive contact details & meeting scheduler */}
      <ContactFooter />

      {/* Floating Rotating sticker tag that scrolls to AI audit */}
      <button
        onClick={handleScrollToAudit}
        className="fixed bottom-6 right-6 z-40 hidden md:flex h-14 w-14 items-center justify-center rounded-full border border-editorial-charcoal bg-white text-editorial-charcoal hover:bg-editorial-orange hover:text-white shadow-md transition-all duration-300 cursor-pointer group"
        title="Launch Instant Growth Audit"
      >
        <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
        <span className="absolute -inset-1 rounded-full border border-dashed border-editorial-orange/40 opacity-0 group-hover:opacity-100 animate-spin-slow pointer-events-none" />
      </button>

      {/* Stately back to top anchor */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-editorial-charcoal/10 bg-white text-editorial-charcoal shadow-sm hover:border-editorial-orange hover:text-editorial-orange transition-all duration-300 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

    </div>
  );
}

