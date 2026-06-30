import { useState } from 'react';
import { caseStudies } from '../data';
import { CaseStudy } from '../types';
import { ChevronDown, ChevronUp, ArrowUpRight, TrendingUp, Info, Activity } from 'lucide-react';

export default function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(caseStudies[0].id); // Default expand the first one for high visual engagement!

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    // Auto-expand the first filtered case study
    const filtered = filter === 'all' 
      ? caseStudies 
      : caseStudies.filter(c => c.industry.toLowerCase().includes(filter.toLowerCase()));
    if (filtered.length > 0) {
      setExpandedId(filtered[0].id);
    } else {
      setExpandedId(null);
    }
  };

  const filteredStudies = activeFilter === 'all' 
    ? caseStudies 
    : caseStudies.filter(c => c.industry.toLowerCase().includes(activeFilter.toLowerCase()));

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="case-studies" className="bg-editorial-cream py-20 px-4 md:px-8 border-b border-editorial-charcoal/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-16 text-center">
          <span className="font-sans text-xs font-bold text-editorial-orange uppercase tracking-[3px] block mb-3">
            🏆 DATA-DRIVEN PROOF
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-editorial-charcoal tracking-tight leading-tight mt-1">
            Proven Sprints in Action.
          </h2>
          <p className="font-sans text-base text-editorial-charcoal/70 mt-4 max-w-xl mx-auto leading-relaxed">
            Click on any strategic case study below to reveal the full breakdown—including the market diagnostic audits, critical positioning shifts, and verified commercial impact.
          </p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { label: 'All Sprints', id: 'all' },
            { label: 'B2B SaaS', id: 'saas' },
            { label: 'E-Commerce / DTC', id: 'ecommerce' },
            { label: 'FinTech & Assets', id: 'fintech' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleFilterClick(btn.id)}
              className={`rounded-full border px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === btn.id 
                  ? 'bg-editorial-orange text-white border-editorial-orange shadow-sm' 
                  : 'bg-white text-editorial-charcoal/70 border-editorial-charcoal/10 hover:border-editorial-orange/30 hover:text-editorial-orange shadow-sm'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Staggered Interactive Case Studies Display */}
        <div className="flex flex-col gap-6">
          {filteredStudies.map((study: CaseStudy) => {
            const isExpanded = expandedId === study.id;
            return (
              <div 
                key={study.id}
                className={`rounded-2xl border bg-white transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'border-editorial-orange shadow-lg' : 'border-editorial-charcoal/15 shadow-sm hover:border-editorial-charcoal/35'
                }`}
              >
                {/* Accordion Trigger Header */}
                <div 
                  onClick={() => toggleExpand(study.id)}
                  className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-7 cursor-pointer gap-6 transition-colors ${
                    isExpanded ? 'bg-editorial-cream/30' : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <span className="text-2xl p-2.5 rounded-xl bg-editorial-cream border border-editorial-charcoal/5">
                      {study.emoji}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-sans text-[10px] font-bold text-editorial-charcoal/40 uppercase tracking-widest">
                          {study.clientName}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-editorial-charcoal/20" />
                        <span className="font-sans text-[10px] font-bold text-editorial-orange uppercase tracking-wider">
                          {study.industry}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-editorial-charcoal tracking-tight leading-snug">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  {/* High-Impact Stat Badges on Header */}
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    {study.metrics.slice(0, 2).map((metric, mIdx) => (
                      <div 
                        key={mIdx}
                        className="rounded-full border border-editorial-charcoal/10 bg-editorial-cream/50 px-4 py-2 text-center min-w-[110px]"
                      >
                        <div className="font-display text-base font-bold text-editorial-charcoal leading-none">
                          {metric.value}
                        </div>
                        <div className="font-sans text-[8px] font-bold text-editorial-charcoal/50 uppercase tracking-wider leading-none mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}

                    <div className="h-10 w-10 flex items-center justify-center rounded-full border border-editorial-charcoal/15 bg-white text-editorial-charcoal ml-auto shrink-0 transition-transform duration-300 group-hover:scale-105">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Strategy Area */}
                {isExpanded && (
                  <div className="border-t border-editorial-charcoal/10 p-7 md:p-9 bg-white text-left">
                    
                    {/* Upper Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                      {study.metrics.map((metric, mIdx) => (
                        <div 
                          key={mIdx}
                          className="rounded-xl border border-editorial-charcoal/10 bg-editorial-cream/20 p-5 flex items-start gap-3.5"
                        >
                          <div className="h-7 w-7 rounded-full bg-editorial-charcoal flex items-center justify-center text-white shrink-0 font-display text-xs font-bold italic">
                            {mIdx + 1}
                          </div>
                          <div>
                            <div className="font-display text-2xl font-bold text-editorial-orange leading-none mb-1">
                              {metric.value}
                            </div>
                            <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-editorial-charcoal/50 block mb-1.5">
                              {metric.label}
                            </span>
                            <p className="font-sans text-xs text-editorial-charcoal/70 leading-relaxed">
                              {metric.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      
                      {/* Left: Challenge & Core Strategy Shifts */}
                      <div className="lg:col-span-8 space-y-6">
                        <div>
                          <h4 className="flex items-center gap-2 font-display text-lg font-bold text-editorial-charcoal mb-2">
                            <Info className="h-4 w-4 text-editorial-orange" />
                            <span>The High-Friction Challenge:</span>
                          </h4>
                          <p className="font-sans text-sm text-editorial-charcoal/80 leading-relaxed font-normal">
                            {study.challenge}
                          </p>
                        </div>

                        <div>
                          <h4 className="flex items-center gap-2 font-display text-lg font-bold text-editorial-charcoal mb-3">
                            <Activity className="h-4 w-4 text-editorial-orange" />
                            <span>The Growth Strategy Shift Deployed:</span>
                          </h4>
                          <ul className="space-y-3">
                            {study.strategy.map((item, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-3 text-editorial-charcoal/80 font-normal">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-editorial-cream border border-editorial-charcoal/10 text-editorial-orange font-mono text-[10px] font-bold">
                                  {sIdx + 1}
                                </span>
                                <span className="font-sans text-sm">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Bold Outcome Card */}
                      <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-editorial-charcoal/10 bg-editorial-cream/30 p-6 h-full">
                        <div>
                          <div className="flex items-center gap-1.5 font-sans text-[9px] font-bold text-editorial-orange bg-white border border-editorial-charcoal/10 px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                            <TrendingUp className="h-3 w-3" />
                            <span>Ultimate Outcome</span>
                          </div>
                          <p className="font-display text-lg font-semibold text-editorial-charcoal italic leading-relaxed">
                            "{study.impact}"
                          </p>
                        </div>

                        {/* Aesthetic Dossier Info Segment */}
                        <div className="mt-8 border-t border-dashed border-editorial-charcoal/15 pt-4">
                          <div className="flex justify-between items-center text-[9px] font-sans font-bold tracking-widest text-editorial-charcoal/40 uppercase">
                            <span>Diagnostic Dossier</span>
                            <span>Verified</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
