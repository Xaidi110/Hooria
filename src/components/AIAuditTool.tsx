import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  BarChart, 
  TrendingUp, 
  FileText,
  User,
  Lightbulb
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AuditResult } from '../types';

interface AIAuditToolProps {
  onClose?: () => void;
}

const LOADING_STEPS = [
  'Connecting to Hooria’s Growth brain...',
  'Analyzing your digital messaging hook...',
  'Auditing typical DACH market competitive overlaps...',
  'Checking your value proposition friction indices...',
  'Drafting direct, high-contrast positioning recommendations...',
  'Finalizing your digital presence growth blueprint...'
];

export default function AIAuditTool({ onClose }: AIAuditToolProps) {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [challenge, setChallenge] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cycle loading messages for a realistic, engaging AI audit process
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < LOADING_STEPS.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !industry || !challenge) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          industry,
          challenge,
          targetAudience
        })
      });

      if (!response.ok) {
        throw new Error('Audit request failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('The growth brain hit a high-traffic sprint. Let\'s try triggering it again!');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setBusinessName('');
    setIndustry('');
    setChallenge('');
    setTargetAudience('');
    setError(null);
  };

  return (
    <div id="ai-audit-tool" className="mx-auto max-w-4xl rounded-2xl border border-editorial-charcoal/15 bg-white p-6 md:p-10 shadow-lg relative overflow-hidden">
      
      {/* Interactive Title Header */}
      <div className="mb-8 border-b border-editorial-charcoal/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-editorial-orange animate-pulse" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-editorial-orange">
              ONLINE DIAGNOSTIC ENGINE
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-editorial-charcoal tracking-tight leading-none">
            Hooria’s AI Growth Twin™
          </h3>
          <p className="font-sans text-xs sm:text-sm text-editorial-charcoal/60 mt-1">
            Get an instant, data-driven positioning and funnel audit in less than 10 seconds.
          </p>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-editorial-charcoal bg-white hover:bg-editorial-charcoal hover:text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Audit Another Brand</span>
          </button>
        )}
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/50 p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-display text-sm font-bold text-editorial-charcoal">Strategic Audit Interrupted</span>
            <p className="font-sans text-xs text-red-600 mt-1 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* LOADING STATE - Terminal style */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="relative mb-6">
            <div className="h-16 w-16 rounded-full border-2 border-dashed border-editorial-orange animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-editorial-orange" />
          </div>
          <h4 className="font-display text-lg font-bold text-editorial-charcoal tracking-tight mb-2">
            Formulating Direct Directives...
          </h4>
          <div className="max-w-md bg-editorial-charcoal border border-editorial-charcoal text-emerald-400 p-5 rounded-xl font-mono text-xs text-left w-full shadow-md">
            <div className="flex gap-1.5 mb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="space-y-1.5 text-emerald-300/90 font-mono">
              <div>&gt; HOORIA_STRATEGY_ENGINE_v3.5_INIT...</div>
              <div className="text-white">&gt; {LOADING_STEPS[loadingStep]}</div>
              <div className="animate-pulse text-editorial-orange">&gt; Thinking... _</div>
            </div>
          </div>
        </div>
      )}

      {/* FORM INPUT STATE */}
      {!loading && !result && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal mb-1.5">
                Business Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., NaturKind GmbH"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-editorial-charcoal/20 px-4 py-3 font-sans text-sm font-medium text-editorial-charcoal focus:outline-none focus:border-editorial-orange bg-editorial-cream/10 transition-colors"
              />
            </div>

            <div>
              <label className="block font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal mb-1.5">
                Industry / Niche *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Direct-to-Consumer Cosmetics"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-xl border border-editorial-charcoal/20 px-4 py-3 font-sans text-sm font-medium text-editorial-charcoal focus:outline-none focus:border-editorial-orange bg-editorial-cream/10 transition-colors"
              />
            </div>
          </div>

          <div className="text-left">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal mb-1.5">
              Target Audience / Persona (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Young professionals looking for high-trust bio options"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full rounded-xl border border-editorial-charcoal/20 px-4 py-3 font-sans text-sm font-medium text-editorial-charcoal focus:outline-none focus:border-editorial-orange bg-editorial-cream/10 transition-colors"
            />
          </div>

          <div className="text-left">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal mb-1.5">
              What is your primary digital growth or positioning bottleneck? *
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g., We have traffic, but visitors leave immediately because they think we are a generic pharmaceutical brand."
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              className="w-full rounded-xl border border-editorial-charcoal/20 px-4 py-3 font-sans text-sm font-medium text-editorial-charcoal focus:outline-none focus:border-editorial-orange bg-editorial-cream/10 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="group relative flex items-center justify-center gap-2 w-full rounded-full bg-editorial-orange hover:bg-editorial-charcoal py-4 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>Analyze My Digital Presence</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      )}

      {/* AUDIT OUTPUT STATE */}
      {!loading && result && (
        <div className="space-y-8 animate-fade-in text-left">
          
          {/* Top Score & Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-editorial-charcoal text-white rounded-2xl p-7 border border-editorial-charcoal">
            
            {/* Numeric Score Badge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b border-dashed border-white/10 md:border-b-0 md:border-r md:border-white/10">
              <span className="font-sans text-[10px] text-editorial-orange font-bold uppercase tracking-widest mb-1">
                Growth Readiness
              </span>
              <div className="relative flex items-center justify-center">
                <span className="font-display text-6xl md:text-7xl font-bold text-white">
                  {result.growthScore}
                </span>
                <span className="font-display text-sm italic text-editorial-orange font-semibold self-end mb-3 ml-1">
                  /100
                </span>
              </div>
              <div className="mt-2 text-[10px] uppercase font-bold tracking-wider text-editorial-cream/60">
                {result.growthScore < 70 ? '⚠️ Critical Issues Identified' : '🚀 Ready to Scale'}
              </div>
            </div>

            {/* Strategic Label */}
            <div className="md:col-span-8 p-2 flex flex-col gap-2">
              <div className="inline-flex items-center gap-1.5 font-sans text-[9px] font-bold text-white bg-editorial-orange px-3 py-1 rounded-full w-fit uppercase tracking-widest">
                <TrendingUp className="h-3 w-3" />
                <span>DACH Scaling Assessment</span>
              </div>
              <h4 className="font-display text-2xl font-bold text-white leading-snug">
                {result.marketPotential}
              </h4>
              <p className="font-sans text-xs text-editorial-cream/70 leading-relaxed">
                Customized high-contrast audit for **{businessName}** generated by Hooria's diagnostic rules.
              </p>
            </div>

          </div>

          {/* Sprints / Priorities */}
          <div>
            <h4 className="flex items-center gap-2 font-display text-lg font-bold text-editorial-charcoal mb-4">
              <AlertTriangle className="h-4 w-4 text-editorial-orange" />
              <span>Prioritized Sprints &amp; Strategy Shifts:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {result.prioritizedInsights.map((insight, idx) => (
                <div 
                  key={idx}
                  className="rounded-xl border border-editorial-charcoal/10 p-5 bg-editorial-cream/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="font-sans text-[9px] font-bold text-editorial-charcoal/40 uppercase tracking-widest">
                        {insight.area}
                      </span>
                      <span className={`font-sans text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        insight.status === 'high' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : insight.status === 'medium' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {insight.status}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-editorial-charcoal/80 leading-relaxed font-medium">
                      {insight.recommendation}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-editorial-charcoal/5 pt-2.5 flex items-center gap-1.5 font-sans text-[8px] text-editorial-charcoal/40 font-bold uppercase tracking-wider">
                    <CheckCircle className="h-3 w-3 text-editorial-orange" />
                    <span>Validated Action Step</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Markdown Blueprint */}
          <div className="rounded-xl border border-editorial-charcoal/10 p-6 md:p-8 bg-editorial-cream/30">
            <h4 className="flex items-center gap-2 font-display text-lg font-bold text-editorial-charcoal mb-4">
              <FileText className="h-5 w-5 text-editorial-orange" />
              <span>Step-by-Step Tactical Blueprint:</span>
            </h4>
            
            <div className="markdown-body p-6 bg-white rounded-xl border border-editorial-charcoal/10 max-h-[400px] overflow-y-auto">
              <ReactMarkdown>{result.customBlueprint}</ReactMarkdown>
            </div>
          </div>

          {/* Strategy call invitation */}
          <div className="rounded-xl border border-dashed border-editorial-charcoal/20 bg-editorial-cream/10 p-7 text-center">
            <h5 className="font-display text-lg font-bold text-editorial-charcoal mb-1">
              Deploy these findings in a 30-day velocity sprint.
            </h5>
            <p className="font-sans text-xs text-editorial-charcoal/60 mb-5">
              Book a direct consulting session to map your digital pipeline and scale your authority.
            </p>
            <button
              onClick={() => {
                const footerEl = document.getElementById('contact-footer');
                if (footerEl) {
                  footerEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-1.5 rounded-full bg-editorial-orange hover:bg-editorial-charcoal text-white px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
            >
              <span>Book Strategy Sprint Session</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
