import { useState, useEffect } from 'react';
import { 
  Globe,
  Search,
  ArrowRight, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  ShieldAlert,
  Layers,
  FileText,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { SEOAuditResult } from '../types';

const LOADING_STEPS = [
  'Initializing real-time HTTP socket request...',
  'Resolving target domain DNS coordinates...',
  'Fetching homepage HTML payload safely...',
  'Analyzing title tag and search snippet optimization...',
  'Auditing header hierarchy (H1, H2 tags)...',
  'Verifying SSL/TLS security status...',
  'Assembling detailed performance & metadata audit...'
];

export default function AIAuditTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<SEOAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      }, 800);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Audit request failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to domain. Please double-check the spelling and ensure the site is live.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setUrl('');
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
              REAL-TIME SEO & VISION ANALYZER
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-editorial-charcoal tracking-tight leading-none">
            Domain Visibility Diagnostic
          </h3>
          <p className="font-sans text-xs sm:text-sm text-editorial-charcoal/60 mt-1">
            Analyze your landing page's search optimization, SSL status, headers, and server latency instantly.
          </p>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-editorial-charcoal bg-white hover:bg-editorial-charcoal hover:text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Audit Another Website</span>
          </button>
        )}
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50/50 p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-display text-sm font-bold text-editorial-charcoal">Domain Diagnostic Error</span>
            <p className="font-sans text-xs text-red-600 mt-1 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="relative mb-6">
            <div className="h-16 w-16 rounded-full border-2 border-dashed border-editorial-orange animate-spin" />
            <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-editorial-orange animate-pulse" />
          </div>
          <h4 className="font-display text-lg font-bold text-editorial-charcoal tracking-tight mb-2">
            Fetching Domain Credentials...
          </h4>
          <div className="max-w-md bg-editorial-charcoal border border-editorial-charcoal text-emerald-400 p-5 rounded-xl font-mono text-xs text-left w-full shadow-md">
            <div className="flex gap-1.5 mb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="space-y-1.5 text-emerald-300/90 font-mono">
              <div>&gt; SEO_SOCKET_STREAM_INIT...</div>
              <div>&gt; CONNECTING_TO: {url}</div>
              <div className="text-white font-medium">&gt; {LOADING_STEPS[loadingStep]}</div>
              <div className="animate-pulse text-editorial-orange">&gt; Analyzing markup... _</div>
            </div>
          </div>
        </div>
      )}

      {/* FORM INPUT STATE */}
      {!loading && !result && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block font-sans text-xs font-bold uppercase tracking-wider text-editorial-charcoal mb-1.5">
              Enter Your Website Domain Name *
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 font-sans text-sm text-editorial-charcoal/40 font-medium">
                https://
              </span>
              <input
                type="text"
                required
                placeholder="example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value.replace(/^https?:\/\//i, ''))}
                className="w-full rounded-xl border border-editorial-charcoal/20 pl-18 pr-4 py-3.5 font-sans text-sm font-medium text-editorial-charcoal focus:outline-none focus:border-editorial-orange bg-editorial-cream/10 transition-colors"
              />
            </div>
            <p className="font-sans text-[11px] text-editorial-charcoal/50 mt-2">
              Provide a valid public URL. We will perform real-time metadata scanning, tag auditing, and connection testing.
            </p>
          </div>

          <button
            type="submit"
            className="group relative flex items-center justify-center gap-2 w-full rounded-full bg-editorial-orange hover:bg-editorial-charcoal py-4 font-sans text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 cursor-pointer shadow-md"
          >
            <span>Analyze Website SEO Profile</span>
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
                Aesthetic & SEO Score
              </span>
              <div className="relative flex items-center justify-center">
                <span className="font-display text-6xl md:text-7xl font-bold text-white">
                  {result.overallScore}
                </span>
                <span className="font-display text-sm italic text-editorial-orange font-semibold self-end mb-3 ml-1">
                  /100
                </span>
              </div>
              <div className="mt-2 text-[10px] uppercase font-bold tracking-wider text-editorial-cream/60">
                {result.overallScore < 70 ? '⚠️ Critical Optimization Needed' : '🚀 Highly Optimized'}
              </div>
            </div>

            {/* Strategic Label */}
            <div className="md:col-span-8 p-2 flex flex-col gap-2">
              <div className="inline-flex items-center gap-1.5 font-sans text-[9px] font-bold text-white bg-editorial-orange px-3 py-1 rounded-full w-fit uppercase tracking-widest">
                <Globe className="h-3 w-3" />
                <span>Live Domain Diagnostic</span>
              </div>
              <h4 className="font-display text-2xl font-bold text-white leading-snug">
                {result.unreachable 
                  ? "Limited Auditing (Site Protected or Unreachable)" 
                  : `Real-time Scan Completed for ${url}`}
              </h4>
              <p className="font-sans text-xs text-editorial-cream/70 leading-relaxed">
                {result.unreachable 
                  ? "We detected strict Cloudflare rules or request blocking. We generated standard baseline diagnostics based on generic public indexing indices instead." 
                  : `Successfully analyzed homepage metrics. Identified ${result.recommendations.filter(r => r.status === 'high').length} high-severity optimization bottlenecks.`}
              </p>
            </div>

          </div>

          {/* Metric Grids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-editorial-charcoal/10 p-4 bg-editorial-cream/10 text-center">
              <span className="font-sans text-[9px] font-bold text-editorial-charcoal/40 uppercase tracking-wider block mb-1">
                Metadata Rank
              </span>
              <span className="font-display text-2xl font-bold text-editorial-charcoal">
                {result.scores.meta}/100
              </span>
            </div>
            
            <div className="rounded-xl border border-editorial-charcoal/10 p-4 bg-editorial-cream/10 text-center">
              <span className="font-sans text-[9px] font-bold text-editorial-charcoal/40 uppercase tracking-wider block mb-1">
                Server Response
              </span>
              <span className="font-display text-2xl font-bold text-editorial-charcoal flex items-center justify-center gap-1">
                <Clock className="h-3.5 w-3.5 text-editorial-orange" />
                {result.responseTimeMs}ms
              </span>
            </div>

            <div className="rounded-xl border border-editorial-charcoal/10 p-4 bg-editorial-cream/10 text-center">
              <span className="font-sans text-[9px] font-bold text-editorial-charcoal/40 uppercase tracking-wider block mb-1">
                SSL Certification
              </span>
              <span className="font-display text-sm font-bold text-editorial-charcoal flex items-center justify-center gap-1 mt-1.5">
                {result.hasSSL ? (
                  <>
                    <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-600">SECURE (HTTPS)</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-4 w-4 text-red-500 shrink-0" />
                    <span className="text-red-600">UNSECURED</span>
                  </>
                )}
              </span>
            </div>

            <div className="rounded-xl border border-editorial-charcoal/10 p-4 bg-editorial-cream/10 text-center">
              <span className="font-sans text-[9px] font-bold text-editorial-charcoal/40 uppercase tracking-wider block mb-1">
                Page Weight
              </span>
              <span className="font-display text-2xl font-bold text-editorial-charcoal">
                {result.pageSizeBytes > 0 ? `${(result.pageSizeBytes / 1024).toFixed(1)} KB` : 'N/A'}
              </span>
            </div>
          </div>

          {/* Detailed Document Tags Diagnostic */}
          <div className="rounded-xl border border-editorial-charcoal/10 p-6 bg-editorial-cream/20">
            <h4 className="flex items-center gap-2 font-display text-lg font-bold text-editorial-charcoal mb-4 border-b border-editorial-charcoal/10 pb-3">
              <FileText className="h-4 w-4 text-editorial-orange" />
              <span>Extracted Page Tags Dashboard</span>
            </h4>
            
            <div className="space-y-4">
              <div>
                <span className="font-sans text-[10px] font-bold text-editorial-charcoal/50 uppercase tracking-wider block mb-1">
                  Meta Title Tag ({result.titleLength} characters):
                </span>
                <div className="bg-white border border-editorial-charcoal/10 rounded-lg p-3 font-mono text-xs text-editorial-charcoal break-all">
                  {result.title}
                </div>
              </div>

              <div>
                <span className="font-sans text-[10px] font-bold text-editorial-charcoal/50 uppercase tracking-wider block mb-1">
                  Meta Description Snippet ({result.descriptionLength} characters):
                </span>
                <div className="bg-white border border-editorial-charcoal/10 rounded-lg p-3 font-mono text-xs text-editorial-charcoal break-all leading-relaxed">
                  {result.metaDescription}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-sans text-[10px] font-bold text-editorial-charcoal/50 uppercase tracking-wider block mb-1">
                    Headers Layout Hierarchy:
                  </span>
                  <div className="bg-white border border-editorial-charcoal/10 rounded-lg p-3 font-mono text-xs text-editorial-charcoal">
                    <div className="flex justify-between border-b border-dashed border-editorial-charcoal/5 pb-1.5 mb-1.5">
                      <span>H1 tags found:</span>
                      <strong className="text-editorial-orange">{result.h1Count}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>H2 tags found:</span>
                      <strong>{result.h2Count}</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="font-sans text-[10px] font-bold text-editorial-charcoal/50 uppercase tracking-wider block mb-1">
                    Indexability Check:
                  </span>
                  <div className="bg-white border border-editorial-charcoal/10 rounded-lg p-3 font-mono text-xs text-editorial-charcoal">
                    <div className="flex justify-between border-b border-dashed border-editorial-charcoal/5 pb-1.5 mb-1.5">
                      <span>Robots policy:</span>
                      <strong>{result.hasRobotsMeta ? 'Declared' : 'Default / General'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Open Graph image:</span>
                      <strong className="truncate max-w-[120px]">{result.openGraphImage !== 'Not found' ? 'Configured' : 'Missing'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sprints / Priorities */}
          <div>
            <h4 className="flex items-center gap-2 font-display text-lg font-bold text-editorial-charcoal mb-4">
              <Layers className="h-4 w-4 text-editorial-orange" />
              <span>Prioritized Search Optimization Checklist</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {result.recommendations.map((rec, idx) => (
                <div 
                  key={idx}
                  className="rounded-xl border border-editorial-charcoal/10 p-5 bg-editorial-cream/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="font-sans text-[9px] font-bold text-editorial-charcoal/40 uppercase tracking-widest">
                        {rec.area}
                      </span>
                      <span className={`font-sans text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        rec.status === 'high' 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : rec.status === 'medium' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-editorial-charcoal/80 leading-relaxed font-medium">
                      {rec.recommendation}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-editorial-charcoal/5 pt-2.5 flex items-center gap-1.5 font-sans text-[8px] text-editorial-charcoal/40 font-bold uppercase tracking-wider">
                    <CheckCircle className="h-3 w-3 text-editorial-orange" />
                    <span>Audit Action Metric</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy call invitation */}
          <div className="rounded-xl border border-dashed border-editorial-charcoal/20 bg-editorial-cream/10 p-7 text-center">
            <h5 className="font-display text-lg font-bold text-editorial-charcoal mb-1">
              Need to convert search traffic into high-value B2B pipeline contracts?
            </h5>
            <p className="font-sans text-xs text-editorial-charcoal/60 mb-5">
              Let's craft high-converting visual copywriting structures and optimize your product positioning.
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
              <span>Book Brand Strategy Consultation</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
