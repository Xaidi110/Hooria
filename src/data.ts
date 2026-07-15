import { CaseStudy, ThoughtLeadership, Service } from './types';

export const services: Service[] = [
  {
    id: 'brand-positioning',
    title: 'Brand Architecture & Positioning Pivot',
    description: 'Stop sounding like everyone else. We rebuild your brand narrative, USP, and communication guidelines to dominate the DACH market and command premium pricing.',
    icon: 'Sparkles',
    deliverables: [
      'Competitive Intelligence Mapping (DACH/Global)',
      'Brand Identity Blueprint & Messaging Framework',
      'High-Contrast Value Proposition Hierarchy',
      'Go-To-Market (GTM) Translation and Localization Strategy'
    ],
    accentColor: 'bg-emerald-400',
    textColor: 'text-emerald-950'
  },
  {
    id: 'digital-growth-engine',
    title: 'Digital Scale Acceleration',
    description: 'We audit your acquisition funnel, optimize your paid channels, and deploy custom landing page designs to convert silent traffic into high-intent revenue pipelines.',
    icon: 'Rocket',
    deliverables: [
      'Data-Driven Acquisition Funnel Mapping & Diagnostics',
      'Conversion Rate Optimization (CRO) Sprint Guides',
      'Performance Marketing Playbook (LinkedIn, Meta, Google)',
      'High-Velocity Landing Page Structure Blueprints'
    ],
    accentColor: 'bg-indigo-400',
    textColor: 'text-indigo-950'
  },
  {
    id: 'fractional-cmo-workshops',
    title: 'Fractional CMO & Growth Sprints',
    description: 'No endless corporate committee meetings. Direct, laser-focused workshops and strategy sprints with your executives to align teams and deploy campaigns in weeks, not quarters.',
    icon: 'Flame',
    deliverables: [
      '3-Day Intensive Growth Strategy Workshops',
      'Multi-Channel Content Loop Systems',
      'MarTech Stack Modernization & Analytics Setup',
      'Talent Scouting & Growth Team Structuring'
    ],
    accentColor: 'bg-amber-400',
    textColor: 'text-amber-950'
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'saas-scale-up',
    clientName: 'SaaSFlow GmbH',
    industry: 'HR Tech B2B SaaS (Munich)',
    title: 'Recalibrating B2B positioning to unlock 3.2x higher ACV.',
    challenge: 'A cutting-edge German HR SaaS was stuck competing on features and pricing. Conversion rates on their high-ticket enterprise packages were stalling because their messaging was overly dry, technical, and lacked emotional urgency.',
    strategy: [
      'Conducted 24 exhaustive client interviews to identify the real business-critical pain points.',
      'Ditched the "All-in-one HR platform" generic label for a high-contrast positioning: "The Compliance Shield for German Scale-ups."',
      'Redesigned the entire self-serve conversion funnel, prioritizing customer-centric value over dry feature tables.',
      'Deployed a targeted LinkedIn thought leadership campaign for the executive team.'
    ],
    impact: 'Replaced high-churn low-tier subscriptions with enterprise-level annual contracts, positioning SaaSFlow as the undisputed market authority in the DACH scale-up ecosystem.',
    metrics: [
      { label: 'ACV Growth', value: '+220%', description: 'Increase in Average Contract Value' },
      { label: 'Pipeline Velocity', value: '45 Days', description: 'Reduced sales cycle by 32%' },
      { label: 'Qualified Demos', value: '+142%', description: 'Increase in inbound leads' }
    ],
    accentColor: 'bg-purple-400',
    textColor: 'text-purple-950',
    borderColor: 'border-purple-500',
    emoji: '📈',
    imageTheme: {
      bg: 'bg-purple-900',
      accent: 'bg-lime-400',
      shape: 'circle'
    }
  },
  {
    id: 'ecommerce-disruptor',
    clientName: 'NaturKind',
    industry: 'Direct-to-Consumer Wellness (Berlin)',
    title: 'Deploying a colorful brand pivot and high-conversion loops.',
    challenge: 'An eco-friendly cosmetics startup was struggling to scale beyond their initial organic audience. Their website felt safe and sterile—similar to traditional pharmacies—which failed to grab attention in a crowded social media landscape.',
    strategy: [
      'Pivoted the brand visual style to a bold, funky, high-contrast typography look (similar to emilyroseco.com).',
      'Introduced "The Clean Ingredient Audit" interactive widget that went viral on TikTok and Instagram.',
      'Re-engineered their post-purchase upsell strategy and customer loyalty feedback loop.',
      'Optimized landing pages with aggressive product-focused micro-animations and zero-friction checkout.'
    ],
    impact: 'Transformed an eco-friendly brand into a lifestyle status symbol, establishing a highly loyal repeat-customer ecosystem across Germany, Austria, and Switzerland.',
    metrics: [
      { label: 'Monthly Revenue', value: '€2.4M', description: 'From €380k to €2.4M in 9 months' },
      { label: 'Customer Retention', value: '+68%', description: 'Increase in 90-day repeat purchases' },
      { label: 'Ad ROI (ROAS)', value: '4.8x', description: 'Sustained ad spend efficiency' }
    ],
    accentColor: 'bg-lime-400',
    textColor: 'text-lime-950',
    borderColor: 'border-lime-500',
    emoji: '⚡',
    imageTheme: {
      bg: 'bg-lime-950',
      accent: 'bg-amber-400',
      shape: 'square'
    }
  },
  {
    id: 'fintech-pioneer',
    clientName: 'VeloCapital',
    industry: 'Fractional Asset Management (Frankfurt)',
    title: 'Bridging institutional credibility with digital-first charisma.',
    challenge: 'A Frankfurt fintech managing alternative investments struggled to convert affluent Gen-Z and Millennial professionals. Their existing portal felt cold and intimidating, driving high bounce rates on signup pages.',
    strategy: [
      'Demystified alternative investments by transforming complex charts into intuitive, playful sliders.',
      'Established an authoritative brand persona on LinkedIn focusing on financial literacy and bold critiques of legacy banking.',
      'Rebuilt the onboarding experience, dividing a 20-step compliance form into a game-like interactive sequence.',
      'Created a hyper-personalized dynamic growth projection tool for registered users.'
    ],
    impact: 'Unlocked unprecedented engagement among affluent young investors, establishing VeloCapital as the absolute digital-first standard for modern asset growth in Germany.',
    metrics: [
      { label: 'Total AUM Added', value: '€85M', description: 'New Assets Under Management in 6 months' },
      { label: 'Onboarding Completion', value: '91%', description: 'Up from 43% bounce rate' },
      { label: 'Referral Rate', value: '4.2x', description: 'Multiplied organic user growth' }
    ],
    accentColor: 'bg-amber-400',
    textColor: 'text-amber-950',
    borderColor: 'border-amber-500',
    emoji: '🏆',
    imageTheme: {
      bg: 'bg-amber-950',
      accent: 'bg-indigo-400',
      shape: 'triangle'
    }
  }
];

export const thoughts: ThoughtLeadership[] = [
  {
    id: 'german-scaleup-positioning',
    title: 'Why German B2B scale-ups lose millions on "safe" marketing.',
    date: 'June 2026',
    readTime: '6 min read',
    category: 'German Market',
    summary: 'The typical German engineering mindset builds perfect products but terrible marketing. Let’s talk about the cost of saying "Wir sind ein führender Anbieter von..." and how to fix it.',
    content: `In my five years working with scale-ups in Munich, Berlin, and Frankfurt, I’ve noticed a recurring pattern. German founders will invest €3M in deep-tech R&D, hire the absolute finest developers, and build a product that works flawlessly. 

Then, they launch it with a website that has the emotional depth of a concrete block.

They hide behind safe, comfortable corporate speak:
- "Wir sind der führende Anbieter von..." (We are the leading provider of...)
- "Zukunftssichere Lösungen für Ihr Unternehmen" (Future-proof solutions for your enterprise)
- "Effizient, innovativ und zuverlässig" (Efficient, innovative, and reliable)

Here’s the cold truth: If your headline is interchangeable with any of your competitors, you don’t have a brand. You have a features list with a price tag attached. And when you compete on features, you inevitably get dragged into price wars.

### The Emily Rose Influence: Playful Authority
A colorful, funky visual identity paired with high-contrast, confident messaging isn't just "nice to have"—it’s a direct growth multiplier. When B2B software looks as engaging as a modern consumer brand, it does three things:
1. It instantly breaks through the professional background noise on LinkedIn.
2. It signals intense, forward-focused market confidence.
3. It makes enterprise buyers actually *feel* something.

Don't be afraid to be a little bold, a little funky, and highly opinionated. In marketing, the biggest risk is not being liked; the biggest risk is being completely invisible.`,
    views: 18450,
    engagement: '5.4%',
    tags: ['Positioning', 'B2B SaaS', 'DACH Ecosystem']
  },
  {
    id: 'data-driven-brand-audit',
    title: 'The Growth Diagnostic: Deconstructing the "Vibe-Check" marketing.',
    date: 'May 2026',
    readTime: '4 min read',
    category: 'Growth',
    summary: 'Brand isn’t some abstract, airy-fairy concept. It is a highly analytical conversion machine. Here is how I measure and audit the cold financial performance of your brand identity.',
    content: `Many founders think "branding" is just choosing colors and putting a logo on a mug. They treat it as an expense, not an investment. 

But as a growth strategist, I look at brand through the lens of unit economics:
- **Client Acquisition Cost (CAC)**: A high-trust, memorable brand reduces paid ad CAC by up to 40% because CTR is higher and conversion rates are stronger.
- **Average Contract Value (ACV)**: Authority brands can command a 20-50% pricing premium over generic alternatives.
- **Retention & LTV**: Brands that form an identity connection with customers see vastly higher repeat purchase rates.

### The Hooria Brand Formula
When I audit a company, I score them on three metrics:
1. **Differentiated Clarity**: Can a 10-year-old understand your unique angle within 5 seconds of opening your page?
2. **Friction-to-Value Ratio**: How many hurdles must a prospect jump before they experience your core product magic?
3. **Charisma Coefficient**: Does your marketing sound like it was written by a human who drank two espressos, or an AI that drank a glass of lukewarm water?

Stop guessing. Audit your metrics, identify the leaks in your positioning, and run tight, data-backed conversion sprints.`,
    views: 12100,
    engagement: '6.2%',
    tags: ['CRO', 'Unit Economics', 'Brand Audit']
  },
  {
    id: 'disruptive-copywriting-playbook',
    title: 'Copywriting is the highest leverage design tool you own.',
    date: 'April 2026',
    readTime: '5 min read',
    category: 'Branding',
    summary: 'You can have the most expensive animations in the world, but if your copy is dull, your pipeline will remain empty. Simple rules for writing copy that converts.',
    content: `Think about the last landing page you converted on. Was it because the background had an incredibly complex custom particle physics simulation? Or was it because a single sentence hit you squarely in the gut, addressing a specific, frustrating problem you had that morning?

Copy is the invisible scaffolding of visual design.

Here are my three rules for disruptive copywriting:
1. **Stop being academic**: Write how you talk to your smartest friend over a beer in Berlin. Avoid long, winding sentences. Be punchy.
2. **Agitate, then Elevate**: Speak clearly about the pain they are experiencing right now (the sleepless nights, the lost budgets, the frustrating manual steps). Then, show how your solution takes them to the promised land.
3. **Show, Don't Tell**: Don't say "Our customer support is outstanding." Say "We answer in 8 minutes, and our lead engineer is the one who solves your problem."

Typography is how copy wears its clothes. High-contrast, bold, editorial-weight headings create the visual rhythm that pulls readers down the page. Use it wisely.`,
    views: 15300,
    engagement: '4.9%',
    tags: ['Copywriting', 'CRO', 'UX Design']
  }
];
