import { Sparkles, Rocket, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { services } from '../data';
import { Service } from '../types';

interface ServicesSectionProps {
  onOpenAudit: () => void;
}

export default function ServicesSection({ onOpenAudit }: ServicesSectionProps) {
  // Map string icon names to Lucide icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="h-5 w-5" />;
      case 'Rocket':
        return <Rocket className="h-5 w-5" />;
      case 'Flame':
        return <Flame className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <section id="services" className="bg-editorial-cream py-20 px-4 md:px-8 border-b border-editorial-charcoal/10 relative overflow-hidden">
      {/* Subtle Editorial Blur Blob background */}
      <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-editorial-orange/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-sans text-xs font-bold text-editorial-orange uppercase tracking-[3px] block mb-3">
              // METHODOLOGY & SYSTEMS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.05] text-editorial-charcoal font-black">
              Laser-focused growth blueprints. <br className="hidden sm:inline" />
              <span className="italic font-normal">Zero corporate fluff.</span>
            </h2>
          </div>
          <p className="font-sans text-base text-editorial-charcoal/70 max-w-sm md:border-l md:border-editorial-charcoal/20 md:pl-6 leading-relaxed">
            I build structured, high-conversion brand positioning frameworks that align your team and establish immediate, un-copyable market authority.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: Service, idx: number) => (
            <div 
              key={service.id}
              className="relative flex flex-col justify-between rounded-2xl border border-editorial-charcoal/15 bg-white p-7 transition-all duration-300 hover:border-editorial-orange/40 hover:shadow-xl group"
            >
              <div>
                {/* Index Card Number */}
                <div className="absolute top-6 right-6 font-display text-2xl italic font-semibold text-editorial-charcoal/20 group-hover:text-editorial-orange/40 transition-colors">
                  0{idx + 1}
                </div>

                {/* Service Icon */}
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-editorial-charcoal/10 bg-editorial-cream text-editorial-charcoal group-hover:bg-editorial-orange group-hover:text-white transition-all duration-300">
                  {getIcon(service.icon)}
                </div>

                {/* Service Title */}
                <h3 className="font-display text-2xl font-bold text-editorial-charcoal mb-4 leading-snug group-hover:text-editorial-orange transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="font-sans text-sm text-editorial-charcoal/80 font-normal mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Specific Deliverables List */}
                <div className="space-y-3.5 pt-6 border-t border-editorial-charcoal/10">
                  <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-editorial-charcoal/50 block mb-2">
                    Scope of Action:
                  </span>
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-left">
                      <CheckCircle className="h-4 w-4 text-editorial-orange mt-0.5 shrink-0" />
                      <span className="font-sans text-xs text-editorial-charcoal/80 leading-normal font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger Inside Service Card */}
              <button 
                onClick={onOpenAudit}
                className="mt-8 inline-flex items-center justify-center gap-1.5 w-full rounded-full border border-editorial-charcoal hover:border-editorial-orange hover:bg-editorial-orange hover:text-white py-3 font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal transition-all duration-300 cursor-pointer"
              >
                <span>Audit This Funnel</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>
          ))}
        </div>

        {/* Editorial interactive banner */}
        <div className="mt-20 rounded-2xl border border-editorial-charcoal/10 bg-editorial-charcoal p-8 md:p-12 relative overflow-hidden text-center md:text-left shadow-lg">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-editorial-orange/20 rounded-full filter blur-[80px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="font-sans text-xs font-bold text-editorial-orange uppercase tracking-[2px] block mb-2">
                // THE COLD TRUTH
              </span>
              <h3 className="font-display text-3xl font-bold text-white leading-tight">
                Amateurs guess. Leaders measure. <br className="hidden sm:inline" />
                Let’s audit your pipeline.
              </h3>
              <p className="font-sans text-sm text-editorial-cream/70 mt-2 leading-relaxed">
                Skip the template consultations. We run high-velocity positioning sprints to fix metric leaks and capture real market share.
              </p>
            </div>
            
            <button
              onClick={onOpenAudit}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-editorial-orange text-white px-7 py-4 font-sans text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-editorial-charcoal transition-all duration-300 cursor-pointer shadow-md"
            >
              <span>Get Your Strategic Growth Blueprint</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
