export type PageRoute =
  | "home"
  | "about"
  | "offerings"
  | "possibilities"
  | "case-studies"
  | "contact";

export interface StrengthPillar {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  outcome: string;
  deliverables: string[];
  engagementWindow: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface BlueprintArticle {
  slug: string;
  category: string;
  readTime: string;
  published: string;
  title: string;
  summary: string;
  relatedStrength: string;
  stages: {
    context: string;
    planning: string;
    capabilities: string[];
    impact: string;
  };
  metrics: { label: string; value: string }[];
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  location: string;
  strengthId: string;
  title: string;
  challenge: string;
  execution: string;
  outcomeMetric: string;
  outcomeContext: string;
  secondaryMetrics: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  context: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface OperatingPrinciple {
  sanskrit: string;
  translation: string;
}

export interface PlatformOrEvent {
  type: "Platform" | "Executive Event";
  title: string;
  schedule: string;
  summary: string;
}

export const IMAGES = {
  heroLandscape: "/src/assets/images/hero_serene_landscape_1794832294194.jpg",
  founderWorkspace: "/src/assets/images/about_founder_workspace_1794832294826.jpg",
  architectureHub: "/src/assets/images/case_study_architecture_1794832300055.jpg",
  directorPortrait: "/src/assets/images/director_portrait_1794832295991.jpg",
} as const;

export const CLIENT_ECOSYSTEM_NAMES = [
  "Meridian Logistics",
  "Verve Clinical",
  "Kinetix Commerce",
  "Aranya Ventures",
  "Navis Precision",
];

export const CORE_STRENGTHS: StrengthPillar[] = [
  {
    id: "presence",
    index: "01",
    name: "Presence",
    tagline: "Establish a stronger digital presence.",
    description:
      "Your digital footprint is often the first place enterprise buyers and partners evaluate credibility. We design and engineer calm, authoritative web experiences and brand systems built for clarity.",
    outcome: "Cohesive enterprise positioning across web, brand, and search visibility.",
    deliverables: [
      "Website Development",
      "Website Design and UX/UI",
      "Branding and Brand Identity",
      "Search Engine Optimisation (SEO)",
      "Website Maintenance",
    ],
    engagementWindow: "4–8 Weeks",
  },
  {
    id: "acquisition",
    index: "02",
    name: "Acquisition",
    tagline: "Reach the right audience and generate business demand.",
    description:
      "Move beyond disconnected campaigns. We align messaging, content architecture, and targeted performance channels so decision-makers discover your business with intent.",
    outcome: "Predictable, qualified B2B demand without bloated agency retainers.",
    deliverables: [
      "Digital Marketing",
      "Performance Marketing",
      "Search Engine Marketing",
      "Social Media Marketing",
      "Content Marketing",
      "Lead Generation",
    ],
    engagementWindow: "Ongoing / Quarterly",
  },
  {
    id: "systems",
    index: "03",
    name: "Systems",
    tagline: "Improve how your business operates through technology.",
    description:
      "Eliminate manual handoffs and fragmented spreadsheets. We architect integrated CRMs, workflow automation, and practical AI-enabled tooling around how your teams actually work.",
    outcome: "Connected daily operations with measurable time and error reduction.",
    deliverables: [
      "CRM Implementation",
      "Workflow Automation",
      "Business Process Automation",
      "System Integration",
      "Digital Infrastructure",
      "AI-enabled Solutions",
    ],
    engagementWindow: "6–10 Weeks",
  },
  {
    id: "products",
    index: "04",
    name: "Products",
    tagline: "Build and develop digital products.",
    description:
      "From foundational web and mobile platforms to modernizing existing software, we assemble vetted Indian engineering specialists with single-point accountability from architecture to release.",
    outcome: "Production-grade digital products shipped reliably without expanding fixed headcount.",
    deliverables: [
      "Product Development",
      "Web Application Development",
      "Mobile Application Development",
      "Product Enhancement",
      "Ongoing Engineering Support",
    ],
    engagementWindow: "8–16 Weeks",
  },
  {
    id: "expansion",
    index: "05",
    name: "Expansion",
    tagline: "Build access to new markets and commercial opportunities.",
    description:
      "Entering India or scaling across new commercial corridors requires trusted local context. We connect businesses with vetted distribution, technology, and channel partnerships.",
    outcome: "Structured commercial pathways and dependable ecosystem partners.",
    deliverables: [
      "Distribution Partnerships",
      "Channel Development",
      "Technology Partnerships",
      "Commercial Collaboration",
      "Market Access Support",
    ],
    engagementWindow: "6–12 Weeks",
  },
  {
    id: "direction",
    index: "06",
    name: "Direction",
    tagline: "Bring business priorities and execution into alignment.",
    description:
      "You do not need a fully formed technical specification before reaching out. We help assess opportunities, define clear deliverables, and map the exact capabilities required.",
    outcome: "Clarity before commitment—translating executive intent into an executable roadmap.",
    deliverables: [
      "Business Requirement Assessment",
      "Growth Consulting",
      "Business and Digital Strategy",
      "Opportunity Assessment",
      "Execution Planning",
      "Capability Planning",
    ],
    engagementWindow: "2–4 Weeks",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Understand the Business Priority",
    description:
      "CXOs like Sharad, Shahana, and Harsh bring specific operational or growth goals—often before a technical scope exists. We listen first to frame the real objective.",
  },
  {
    step: "02",
    title: "Define Clear Deliverables",
    description:
      "We translate broad priorities into an explicit scope, timeline, and capability plan—removing ambiguity before resources are committed.",
  },
  {
    step: "03",
    title: "Assemble Specialist Capability",
    description:
      "Rather than forcing one rigid in-house team, we coordinate the exact Indian engineering, design, automation, or commercial talent the initiative demands.",
  },
  {
    step: "04",
    title: "Own End-to-End Execution",
    description:
      "Univens remains your single accountable partner from blueprint through delivery, ensuring continuity without adding management overhead to your calendar.",
  },
];

export const POSSIBILITIES_BLUEPRINTS: BlueprintArticle[] = [
  {
    slug: "india-capability-desk-without-headcount-bloat",
    category: "Products & Engineering",
    readTime: "5 min read",
    published: "Blueprint 01",
    title: "Launching a Dedicated Product Capability in India Without Expanding Fixed Headcount",
    summary:
      "How mid-market software and industrial leaders move from stalled roadmaps to consistent bi-weekly releases by pairing clear scope ownership with specialist Indian engineering pods.",
    relatedStrength: "Products",
    stages: {
      context:
        "Growing enterprises frequently face a six-month hiring bottleneck when building digital portals or internal platforms. Relying on fragmented freelancers creates coordination fatigue for founders and CTOs.",
      planning:
        "Start with a 2-week Direction assessment to lock core workflows, architecture boundaries, and a 12-week milestone cadence with one accountable delivery lead.",
      capabilities: [
        "Solution Architecture & UI/UX",
        "Full-Stack Web & Mobile Engineering",
        "Automated QA & Release Governance",
      ],
      impact:
        "Shipped production customer portal in 14 weeks while reducing leadership coordination time by 60%.",
    },
    metrics: [
      { label: "Time to First Release", value: "14 Weeks" },
      { label: "Hiring Overhead Saved", value: "100%" },
      { label: "Delivery Cadence", value: "2-Week Sprints" },
    ],
  },
  {
    slug: "unifying-crm-and-workflow-automation",
    category: "Systems & Automation",
    readTime: "4 min read",
    published: "Blueprint 02",
    title: "Connecting Fragmented Operations: From Manual Spreadsheets to Unified CRM & Automation",
    summary:
      "A practical blueprint for service and distribution businesses looking to connect sales intake, invoicing, and partner handoffs without disrupting live customer operations.",
    relatedStrength: "Systems",
    stages: {
      context:
        "Multi-branch businesses often run on disconnected messaging threads, legacy ERPs, and manual reporting sheets—costing leadership real-time visibility.",
      planning:
        "Audit the top five recurring operational bottlenecks and deploy phased workflow automation alongside a single source-of-truth CRM.",
      capabilities: [
        "CRM Implementation & Data Hygiene",
        "API System Integration",
        "AI-Assisted Triage & Reporting",
      ],
      impact:
        "Cut manual order-to-dispatch reconciliation time by 42% across 14 regional hubs within 8 weeks.",
    },
    metrics: [
      { label: "Turnaround Improvement", value: "42% Faster" },
      { label: "Regional Hubs Connected", value: "14 Branches" },
      { label: "Rollout Window", value: "8 Weeks" },
    ],
  },
  {
    slug: "rebuilding-enterprise-presence-and-demand",
    category: "Presence & Acquisition",
    readTime: "4 min read",
    published: "Blueprint 03",
    title: "Turning Credibility Into Qualified B2B Pipeline Through Calm Presence & Focused Acquisition",
    summary:
      "Why high-ticket B2B buyers respond better to clarity, verifiable proof, and technical precision than aggressive ad funnels—and how to structure both together.",
    relatedStrength: "Presence",
    stages: {
      context:
        "Established B2B firms often outgrow their early websites, leaving enterprise prospects unsure of their true scale, reliability, and technical depth.",
      planning:
        "Pair a brand-aligned web architecture and technical SEO foundation with targeted account-based content and search acquisition.",
      capabilities: [
        "Brand Positioning & UX Architecture",
        "Technical SEO & Editorial Content",
        "High-Intent Search & LinkedIn Acquisition",
      ],
      impact:
        "Generated a 3.1x lift in qualified enterprise discovery conversations within two quarters.",
    },
    metrics: [
      { label: "Qualified Pipeline Lift", value: "3.1x" },
      { label: "Organic Search Visibility", value: "+185%" },
      { label: "Timeframe", value: "6 Months" },
    ],
  },
  {
    slug: "india-channel-and-distribution-access",
    category: "Expansion & Partnerships",
    readTime: "6 min read",
    published: "Blueprint 04",
    title: "Structured Market Access: Building Commercial & Technology Partnerships Across India",
    summary:
      "A measured playbook for international founders and Indian growth companies establishing distribution channels, co-delivery alliances, and local execution ecosystems.",
    relatedStrength: "Expansion",
    stages: {
      context:
        "Entering a new commercial territory through cold outreach alone is slow and risky. Leaders need vetted commercial partners aligned on quality and accountability.",
      planning:
        "Map priority verticals, establish partner qualification criteria, and build structured co-selling and delivery integration playbooks.",
      capabilities: [
        "Opportunity & Market Assessment",
        "Channel & Distribution Partner Vetting",
        "Technology Integration Support",
      ],
      impact:
        "Activated 9 qualified regional distribution alliances and closed initial commercial pilots inside 10 weeks.",
    },
    metrics: [
      { label: "Partner Alliances Formed", value: "9 Partners" },
      { label: "First Commercial Pilot", value: "10 Weeks" },
      { label: "Market Focus", value: "India & APAC" },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "meridian-logistics",
    client: "Meridian Industrial Logistics",
    sector: "Industrial Distribution",
    location: "Pune & Chennai",
    strengthId: "systems",
    title: "Unified CRM & Dispatch Automation Across 14 Regional Branches",
    challenge:
      "Disconnected branch spreadsheets and manual status updates delayed customer quotes and left executive leadership without consolidated pipeline visibility.",
    execution:
      "Univens conducted a 2-week requirement assessment, deployed a customized CRM with automated partner notifications, and integrated legacy billing tools without halting live operations.",
    outcomeMetric: "42% Faster",
    outcomeContext: "Quote-to-dispatch turnaround within 8 weeks",
    secondaryMetrics: [
      { label: "Branches Integrated", value: "14 Hubs" },
      { label: "Manual Entry Reduced", value: "68%" },
      { label: "Delivery Timeline", value: "8 Weeks" },
    ],
  },
  {
    id: "verve-clinical",
    client: "Verve Clinical Systems",
    sector: "HealthTech Platform",
    location: "Bengaluru & Singapore",
    strengthId: "products",
    title: "Zero-to-One Diagnostic Workflow Web & Mobile Platform Shipped in 14 Weeks",
    challenge:
      "The founding team needed a compliant clinician web portal and companion mobile app, but lacked internal full-stack bandwidth and wanted to avoid managing multiple contractors.",
    execution:
      "Univens assembled a dedicated product pod—UX architect, frontend/mobile engineers, and QA lead—under one execution lead to design, build, and launch v1.0.",
    outcomeMetric: "14 Weeks",
    outcomeContext: "Concept to live multi-clinic production rollout",
    secondaryMetrics: [
      { label: "Clinics Onboarded", value: "38 Sites" },
      { label: "Uptime Reliability", value: "99.94%" },
      { label: "Release Cadence", value: "Bi-weekly" },
    ],
  },
  {
    id: "kinetix-commerce",
    client: "Kinetix Commerce Partners",
    sector: "B2B Advisory & Retail Tech",
    location: "Mumbai & London",
    strengthId: "presence",
    title: "Enterprise Rebrand, Web Platform & Targeted B2B Demand Engine",
    challenge:
      "Despite strong enterprise credentials, an outdated website and ad-hoc outbound efforts undersold the firm's capabilities to international retail executives.",
    execution:
      "Univens redesigned their brand identity and web architecture for executive clarity, paired with a disciplined search and content acquisition program.",
    outcomeMetric: "3.1x Lift",
    outcomeContext: "Qualified enterprise inbound conversations in 6 months",
    secondaryMetrics: [
      { label: "Inbound Conversion", value: "+140%" },
      { label: "Avg. Deal Velocity", value: "28% Faster" },
      { label: "Program Horizon", value: "6 Months" },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sharad",
    quote:
      "We didn't arrive with a technical specification—only an operational bottleneck slowing down fourteen branches. Univens brought clarity within ten days, owned the entire systems rollout, and gave our leadership team breathing room back.",
    author: "Sharad Mehta",
    role: "Managing Director",
    company: "Meridian Industrial Logistics",
    context: "Systems & Workflow Automation Engagement",
  },
  {
    id: "shahana",
    quote:
      "Instead of juggling three separate agencies and freelance developers, we had one accountable partner who understood clinical workflows and shipped our product on schedule. Every milestone felt calm and predictable.",
    author: "Shahana Nair",
    role: "Co-Founder & COO",
    company: "Verve Clinical Systems",
    context: "Digital Product Development Engagement",
  },
  {
    id: "harsh",
    quote:
      "As a commercial advisory partner, our reputation depends on delivery quality. Univens acts as a seamless extension of our leadership—connecting us to India's best engineering capability with complete transparency.",
    author: "Harshvardhan Rao",
    role: "Chief Executive Officer",
    company: "Kinetix Commerce Partners",
    context: "Presence, Acquisition & Partner Delivery",
  },
];

export const PLATFORMS_AND_EVENTS: PlatformOrEvent[] = [
  {
    type: "Platform",
    title: "Univens Capability Network",
    schedule: "Continuous Ecosystem",
    summary:
      "A curated network of vetted Indian engineering studios, automation architects, UX leads, and commercial specialists coordinated under Univens execution governance.",
  },
  {
    type: "Platform",
    title: "CXO Opportunity Briefings",
    schedule: "Bi-Weekly Curated Dispatch",
    summary:
      "Quiet, domain-filtered briefings on technology partnerships, India market access openings, and verified operational blueprints tailored to your stated priorities.",
  },
  {
    type: "Executive Event",
    title: "Execution First Roundtable — Bengaluru & Virtual",
    schedule: "Quarterly CXO Forum",
    summary:
      "Closed-door peer sessions for founders and enterprise leaders exploring practical AI systems, cross-border delivery, and capital-efficient growth.",
  },
];

export const FAQS: FaqItem[] = [
  {
    id: "what-is-univens",
    question: "What is Univens?",
    answer:
      "Univens is a business capability and execution partner. We work with founders, CXOs and business leaders to understand their requirements, bring together the right expertise and take ownership of getting the work done.",
  },
  {
    id: "what-can-univens-help-with",
    question: "What can Univens help my business with?",
    answer:
      "We support business requirements across technology, digital operations and growth. This includes website and product development, digital marketing, automation, business technology and specialist engineering. The capabilities involved depend on what your business needs.",
  },
  {
    id: "how-is-univens-different",
    question: "How is Univens different from a traditional service provider?",
    answer:
      "We don't begin with a fixed list of services. We begin by understanding your business requirement, defining the work and identifying the capabilities needed to deliver it. We then coordinate the relevant expertise and take responsibility for execution.",
  },
  {
    id: "work-with-india",
    question: "Can Univens help businesses looking to work with India?",
    answer:
      "Yes. We help businesses explore relevant technology and execution capabilities within India's growing business ecosystem. Depending on the requirement, this can involve specialist expertise, engineering support and suitable business or delivery partnerships.",
  },
  {
    id: "indian-businesses-too",
    question: "Do you work with Indian businesses as well?",
    answer:
      "Absolutely. We work with businesses in India that want to build, improve or expand their operations, as well as businesses exploring opportunities beyond their existing markets. The focus is always on the requirement, not the location.",
  },
  {
    id: "know-exact-service",
    question: "Do I need to know exactly which service I need?",
    answer:
      "No. You can approach us with a defined project, a specific requirement or a business problem you are trying to solve. We will work with you to understand the need, establish the scope and identify the right way to proceed.",
  },
  {
    id: "who-handles-execution",
    question: "Who will handle the execution?",
    answer:
      "Univens takes responsibility for coordinating the engagement and its agreed deliverables. We bring in relevant specialists and delivery partners when required, while maintaining a clear point of contact and accountability.",
  },
  {
    id: "how-to-get-started",
    question: "How do we get started?",
    answer:
      "Tell us what you are working on, what you need to achieve or where you need support. We will understand the requirement and discuss a practical approach, including the scope, capabilities and next steps.",
  },
];

export const OPERATING_PRINCIPLES: OperatingPrinciple[] = [
  {
    sanskrit: "स्पष्टता प्रथमम्। जटिलता अनन्तरम्॥",
    translation: "Clarity comes first. Complexity comes later.",
  },
  {
    sanskrit: "विश्वासः वचनेन न लभ्यते। सततकार्येण एव संपद्यते॥",
    translation:
      "Trust is not earned through words alone. It is built through consistent action.",
  },
  {
    sanskrit: "यत्र संकल्पः, तत्र मार्गः। यत्र सहयोगः, तत्र सिद्धिः॥",
    translation:
      "Where there is determination, a path can be found. Where there is collaboration, achievement becomes possible.",
  },
  {
    sanskrit: "श्रेष्ठः स भवति, यः अन्यान् अग्रे नयति॥",
    translation:
      "A great leader is not simply one who stands ahead of others, but one who helps others move forward.",
  },
  {
    sanskrit: "विवेकः कर्मणः पूर्वम्॥",
    translation: "Discernment must precede action.",
  },
  {
    sanskrit: "सहकार्येण सिद्धिः। स्पर्धया न॥",
    translation: "Achievement comes through collaboration, not competition.",
  },
];

export const WHAT_WE_ARE_NOT = [
  {
    index: "01",
    title: "Not a Freelance Marketplace",
    description:
      "We never leave executives sifting through unvetted profiles or managing fragmented contractors on their own.",
  },
  {
    index: "02",
    title: "Not a Conventional Digital Agency",
    description:
      "We do not push pre-packaged retainers or vanity deliverables detached from business ROI and operational reality.",
  },
  {
    index: "03",
    title: "Not a Disconnected Collection of Services",
    description:
      "Every capability—from brand presence to systems engineering and market access—operates under unified strategic ownership.",
  },
];
