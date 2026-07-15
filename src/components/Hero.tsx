import { ArrowRight, Sparkles, TrendingUp, Compass, Award, Percent } from 'lucide-react';

interface HeroProps {
  onOpenAudit: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onOpenAudit, onScrollToSection }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-editorial-cream px-4 py-16 md:px-8 md:py-24 border-b border-editorial-charcoal/10">
      {/* Background Grid Pattern Overlay for clean editorial structure */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Decorative Editorial Background Blur Blob */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-editorial-orange/15 rounded-full filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-[-150px] w-[400px] h-[400px] bg-editorial-orange/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Bold Copy & Call-To-Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Playful Tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-editorial-charcoal/10 bg-[#FFF] px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-editorial-orange shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Scale-Up Partner &amp; Brand Strategist</span>
            </div>

            {/* Giant High-Contrast Serif Heading */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl tracking-tight text-editorial-charcoal leading-[0.95] mb-6 font-bold">
              Scale with <br />
              <span className="text-editorial-orange italic">Authority.</span>
            </h1>

            {/* Subheading focusing on DACH Target Audience and marketing consulting */}
            <p className="font-sans text-base md:text-lg text-editorial-charcoal/80 font-normal mb-8 max-w-xl leading-relaxed">
              Based in Germany, I partner with ambitious scale-ups and lifestyle innovators to transform safe, forgettable positioning into dominant, conversion-driven digital funnel systems. No corporate fluff. Just raw, un-copyable market leverage.
            </p>

            {/* Playful Interactive Audit Launcher */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-editorial-charcoal text-editorial-cream hover:bg-editorial-orange hover:scale-[1.02] active:scale-[0.98] rounded-full font-sans font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Launch Free SEO Diagnostic</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => onScrollToSection('case-studies')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-editorial-charcoal text-editorial-charcoal hover:bg-editorial-charcoal hover:text-editorial-cream hover:scale-[1.02] rounded-full font-sans font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span>Explore Portfolio</span>
              </button>
            </div>

            {/* Growth Badges/Stickers */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-editorial-charcoal/10 bg-[#FFF] px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-charcoal/70">
                ⚡ CRO Obsessed
              </span>
              <span className="rounded-full border border-editorial-charcoal/10 bg-[#FFF] px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-charcoal/70">
                🥨 DACH Market Specialist
              </span>
              <span className="rounded-full border border-editorial-charcoal/10 bg-[#FFF] px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-charcoal/70">
                🎯 Positioning Strategy
              </span>
              <span className="rounded-full border border-editorial-charcoal/10 bg-[#FFF] px-3.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-charcoal/70">
                🧠 Fractional CMO
              </span>
            </div>

          </div>

          {/* Right Column: Stylized Headshot Card & Sidebar Info */}
          <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col items-center gap-8 justify-center relative mt-6 lg:mt-0">
            
            {/* Visual Block: Hooria Khan stylized avatar mockup */}
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl border border-editorial-charcoal/15 bg-[#FFF] p-4 shadow-xl overflow-visible shrink-0">
              
              {/* Sticker 1: "Hooria Khan" */}
              <div className="absolute -top-4 -left-6 rotate-[-4deg] rounded-full border border-editorial-charcoal/20 bg-editorial-cream px-4 py-1.5 font-display text-xs font-semibold tracking-wider text-editorial-charcoal shadow-md">
                Hooria Khan 🇩🇪
              </div>

              {/* Sticker 2: "+142% leads" */}
              <div className="absolute -bottom-4 -right-6 rotate-[4deg] rounded-full border border-editorial-charcoal/20 bg-[#FFF] px-4 py-1.5 font-mono text-xs font-bold text-editorial-orange shadow-md">
                Funnel Audit: +142% leads
              </div>

              {/* Vector/Artistic representation of Hooria */}
              <div className="w-full h-full rounded-xl border border-editorial-charcoal/10 bg-editorial-cream/50 flex flex-col justify-between p-5 overflow-hidden relative">
                
                {/* Background artistic elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/30 via-[#FFF9F2] to-yellow-50/20 opacity-80" />
                <div className="absolute top-1/4 left-1/4 h-32 w-32 bg-editorial-orange/5 rounded-full filter blur-md animate-spin-slow" />
                
                <div className="relative flex justify-between items-start">
                  <span className="font-sans text-[9px] font-bold tracking-widest text-editorial-orange uppercase">
                    FRANKFURT, DE
                  </span>
                  <span className="font-display font-bold text-xs text-editorial-charcoal/70">
                    Est. 2019
                  </span>
                </div>

                {/* Minimalist modern brand/copy consulting abstract vector icon */}
                <div className="relative flex flex-col items-center justify-center my-auto">
                  <div className="h-28 w-28 rounded-full border border-editorial-charcoal/15 bg-white shadow-md flex items-center justify-center relative group transition-all duration-500 hover:border-editorial-orange/30">
                    <TrendingUp className="h-12 w-12 text-editorial-orange transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-editorial-charcoal flex items-center justify-center text-[10px] text-editorial-cream font-bold">
                      ★
                    </div>
                  </div>
                  <span className="font-display text-lg font-bold mt-4 text-editorial-charcoal tracking-tight text-center">
                    Growth-Led Growth
                  </span>
                  <span className="font-sans text-[9px] font-semibold text-editorial-charcoal/60 tracking-[2px] uppercase mt-1 text-center">
                    POSITIONING • FUNNELS • METRICS
                  </span>
                </div>

                <div className="relative pt-2.5 border-t border-dashed border-editorial-charcoal/10 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-editorial-orange" />
                    <div className="h-2.5 w-2.5 rounded-full bg-editorial-charcoal" />
                    <div className="h-2.5 w-2.5 rounded-full bg-editorial-cream border border-editorial-charcoal/20" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-editorial-charcoal/60 uppercase">
                    No Safe Logos.
                  </span>
                </div>

              </div>

            </div>

            {/* Sidebar-style Stat Boxes - Exactly matches Editorial Aesthetic design HTML */}
            <div className="w-full max-w-sm md:max-w-xs lg:w-full border-l border-editorial-charcoal/30 pl-8 flex flex-col justify-center gap-6 py-2 text-left self-stretch">
              <div className="stat-box">
                <span className="font-display text-4xl font-bold text-editorial-orange block leading-none">340%</span>
                <span className="font-sans text-[10px] uppercase font-bold tracking-[2px] text-editorial-charcoal/60 mt-1 block">
                  Average Growth Rate
                </span>
              </div>
              <div className="stat-box">
                <span className="font-display text-4xl font-bold text-editorial-orange block leading-none">50+</span>
                <span className="font-sans text-[10px] uppercase font-bold tracking-[2px] text-editorial-charcoal/60 mt-1 block">
                  Brands Scaled Globally
                </span>
              </div>
              <div className="stat-box">
                <span className="font-display text-4xl font-bold text-editorial-orange block leading-none">12M€+</span>
                <span className="font-sans text-[10px] uppercase font-bold tracking-[2px] text-editorial-charcoal/60 mt-1 block">
                  Revenue Optimized
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
