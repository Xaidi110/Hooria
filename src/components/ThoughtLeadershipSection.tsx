import { useState } from 'react';
import { thoughts } from '../data';
import { ThoughtLeadership } from '../types';
import { Eye, Award, Clock, ArrowRight, X, Heart, MessageSquare, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ThoughtLeadershipSection() {
  const [selectedThought, setSelectedThought] = useState<ThoughtLeadership | null>(null);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'German Market':
        return 'border-editorial-orange/20 text-editorial-orange bg-editorial-orange/5';
      case 'Strategy':
        return 'border-editorial-charcoal/20 text-editorial-charcoal bg-editorial-cream';
      case 'Branding':
        return 'border-editorial-orange/30 text-editorial-orange bg-editorial-cream';
      case 'Growth':
        return 'border-editorial-charcoal/30 text-editorial-charcoal bg-white';
      default:
        return 'border-editorial-charcoal/10 text-editorial-charcoal/60 bg-white';
    }
  };

  return (
    <section id="thought-leadership" className="bg-editorial-cream py-20 px-4 md:px-8 border-b border-editorial-charcoal/10 relative overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="font-sans text-xs font-bold text-editorial-orange uppercase tracking-[3px] block mb-3">
            🧠 THOUGHT LEADERSHIP
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-editorial-charcoal tracking-tight leading-tight mt-1">
            Raw Insights. No Fluff.
          </h2>
          <p className="font-sans text-base text-editorial-charcoal/70 mt-4 max-w-xl mx-auto leading-relaxed">
            I write about brand positioning architecture, commercial diagnostics, and conversion rate optimizations for high-scale digital pipelines.
          </p>
        </div>

        {/* Thought Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {thoughts.map((thought: ThoughtLeadership) => (
            <div 
              key={thought.id}
              className="rounded-2xl border border-editorial-charcoal/15 bg-white p-7 transition-all duration-300 hover:border-editorial-orange/30 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`font-sans text-[9px] font-bold uppercase tracking-wider border px-3 py-1 rounded-full ${getCategoryColor(thought.category)}`}>
                    {thought.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-sans text-[10px] font-medium text-editorial-charcoal/50">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{thought.readTime}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 
                  className="font-display text-xl font-bold text-editorial-charcoal tracking-tight leading-snug mb-3 hover:text-editorial-orange transition-colors cursor-pointer" 
                  onClick={() => setSelectedThought(thought)}
                >
                  {thought.title}
                </h3>

                {/* Article Summary */}
                <p className="font-sans text-xs md:text-sm text-editorial-charcoal/70 font-normal leading-relaxed mb-6">
                  {thought.summary}
                </p>
              </div>

              {/* Bottom Authority & Simulated LinkedIn Metrics Panel */}
              <div>
                <div className="bg-editorial-cream/30 rounded-xl border border-editorial-charcoal/10 p-3 mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-sans text-[9px] font-bold text-editorial-charcoal/50 uppercase tracking-wider">
                    <Eye className="h-3.5 w-3.5 text-editorial-orange" />
                    <span>{thought.views.toLocaleString()} Views</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-sans text-[9px] font-bold text-editorial-charcoal/50 uppercase tracking-wider">
                    <Award className="h-3.5 w-3.5 text-editorial-orange" />
                    <span>{thought.engagement} Engagement</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedThought(thought)}
                  className="group inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal hover:text-editorial-orange cursor-pointer"
                >
                  <span>Read Full Insight</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* LinkedIn prompt */}
        <div className="mt-16 rounded-2xl border border-editorial-charcoal/15 bg-white p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <span className="text-xl p-2 rounded-full bg-editorial-cream border border-editorial-charcoal/5">🇩🇪</span>
            <div>
              <span className="font-display text-base font-bold text-editorial-charcoal block">Join 15,000+ DACH Business Leaders</span>
              <p className="font-sans text-xs text-editorial-charcoal/60 mt-0.5">I post weekly unfiltered breakdowns on strategic growth audits and brand building guidelines.</p>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/hooriakhan/"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-editorial-orange hover:bg-editorial-charcoal text-white px-5 py-3.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            <span>Follow on LinkedIn</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>

      {/* FULL-SCREEN POPUP READ MODAL */}
      {selectedThought && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-editorial-charcoal/60 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-2xl border border-editorial-charcoal/10 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-editorial-charcoal/10 bg-editorial-cream">
              <div className="flex items-center gap-2">
                <span className={`font-sans text-[9px] font-bold uppercase tracking-wider border px-3 py-1 rounded-full ${getCategoryColor(selectedThought.category)}`}>
                  {selectedThought.category}
                </span>
                <span className="font-sans text-[10px] font-bold text-editorial-charcoal/40 uppercase tracking-widest">{selectedThought.date}</span>
              </div>
              <button 
                onClick={() => setSelectedThought(null)}
                className="h-8 w-8 flex items-center justify-center rounded-full border border-editorial-charcoal/15 bg-white text-editorial-charcoal hover:bg-editorial-orange hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 md:p-9 overflow-y-auto flex-1 text-left bg-white">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-editorial-charcoal tracking-tight leading-snug mb-5">
                {selectedThought.title}
              </h3>
              
              <div className="flex items-center gap-4 border-y border-editorial-charcoal/10 py-3.5 mb-6 font-sans text-[10px] font-bold uppercase tracking-wider text-editorial-charcoal/50">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-editorial-orange" />
                  <span>{selectedThought.views.toLocaleString()} Views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-editorial-orange" />
                  <span>{selectedThought.engagement} Engagement</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-editorial-charcoal/20 ml-auto" />
                <span>{selectedThought.readTime}</span>
              </div>

              <div className="markdown-body">
                <ReactMarkdown>{selectedThought.content}</ReactMarkdown>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-editorial-charcoal/10 bg-editorial-cream/50 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex gap-2">
                {selectedThought.tags.map((tag) => (
                  <span key={tag} className="font-sans text-[9px] font-bold text-editorial-charcoal/40 bg-editorial-cream border border-editorial-charcoal/5 px-2 py-0.5 rounded uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedThought(null)}
                className="rounded-full bg-editorial-orange hover:bg-editorial-charcoal text-white px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
