// ─── Core types ──────────────────────────────────────────────────────────────

export interface PlacementStats {
  highestPackage?: string;
  averagePackage?: string;
  placementRate?: string;
  topRecruiters?: string[];
}

export interface ComparisonStats {
  topRoles: string[];
  demandSignal: string;
  saturation: "Low" | "Medium" | "High";
  salaryRange: string;
  careerCeiling: string[];
  topHirers: string[];
  keySkills: string[];
  postgradEdge: string;
}

export interface Course {
  id: string;
  name: string;
  degree: string;
  tagline: string;
  realStrengths: string[];
  placementStats?: PlacementStats;
  labs?: string[];
  faculty?: string[];
  curriculumHighlights: string[];
  overlapNote?: string;
  comparisonStats?: ComparisonStats;
}

export interface SignalCondition {
  signalKey: string;
  signalValue: string;
}

export interface ConditionalRoute {
  anyOf: SignalCondition[];
  destinationCourseId: string;
  pitchAngle: string;
}

export interface RouteConfig {
  conditionalRoutes?: ConditionalRoute[];
  destinationCourseId: string;
  pitchAngle: string;
}

export type RouteMap = Record<string, RouteConfig>;

export interface SignalOption {
  value: string;
  label: string;
}

export interface Signal {
  key: string;
  question: string;
  options: SignalOption[];
}

// ─── Source courses (shown in dropdown) ──────────────────────────────────────

export const SOURCE_IDS = [
  "cse",
  "cse-aiml",
  "cse-core-google",
  "bca",
  "bba",
] as const;

// ─── Course Data ─────────────────────────────────────────────────────────────

export const courses: Course[] = [

  // ── B.Tech CSE: source courses ─────────────────────────────────────────────

  {
    id: "cse",
    name: "CSE",
    degree: "B.Tech Computer Science (CSE)",
    tagline: "Build the systems that power the world",
    realStrengths: [
      "Broad software engineering foundation covering systems, networks, and security",
      "Flexible elective stream — specialise in your final year",
      "Strong alumni network across product and service companies",
      "Hands-on labs in OS, networking, databases, and cloud",
    ],
    labs: ["Systems Lab", "Networking Lab", "Database Studio"],
    curriculumHighlights: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management",
      "Computer Networks",
      "Software Engineering",
      "Cloud Computing (Elective)",
      "Final Year Project",
    ],
    overlapNote:
      "90% shared core with CSE (Google Cloud & IIT KGP) in years 1–2. Industry exposure is the key differentiator from year 3.",
    comparisonStats: {
      topRoles: ["Software Developer", "Web Developer", "Systems Analyst", "IT Consultant"],
      demandSignal: "Thousands of software jobs open every year — but so are thousands of fresh graduates, so you'll need to stand out.",
      saturation: "High",
      salaryRange: "₹5–8 lakh per year",
      careerCeiling: ["Junior Developer in year 1–2", "Team Lead by year 5–6", "Engineering Manager or CTO possible in 12–15 years"],
      topHirers: ["TCS", "Infosys", "Wipro", "Accenture"],
      keySkills: ["Build apps from scratch", "Design how large systems work", "Solve coding problems fast", "Understand how computers talk to each other"],
      postgradEdge: "You can apply for M.Tech via GATE or MS abroad via GRE — both are realistic but need serious preparation.",
    },
  },

  {
    id: "cse-aiml",
    name: "CSE AI-ML",
    degree: "B.Tech Computer Science (CSE)",
    tagline: "Engineer the intelligence of tomorrow",
    realStrengths: [
      "Dedicated AI/ML lab with GPU clusters for hands-on model training",
      "Specialised curriculum covering deep learning, NLP, and computer vision",
      "Industry projects from year 2 onwards",
      "Strong pipeline to AI-first startups and product companies",
    ],
    labs: ["AI & ML Research Lab", "GPU Computing Centre", "NLP Studio"],
    curriculumHighlights: [
      "Data Structures & Algorithms",
      "Machine Learning Theory",
      "Deep Learning & Neural Networks",
      "Natural Language Processing",
      "Computer Vision",
      "MLOps & Model Deployment",
      "Capstone Industry Project",
    ],
    overlapNote:
      "75% shared core with CSE Data Science in years 1–2. Data Science diverges strongly from year 3 with statistics and business analytics focus.",
    comparisonStats: {
      topRoles: ["AI Developer", "Machine Learning Engineer", "Data Engineer", "AI Research Associate"],
      demandSignal: "AI jobs have grown dramatically in the last 3 years and companies are still struggling to find good people — it's a great time to enter this field.",
      saturation: "Medium",
      salaryRange: "₹8–14 lakh per year",
      careerCeiling: ["Junior AI Developer in year 1–2", "AI Team Lead by year 5–6", "Head of AI in 10–12 years"],
      topHirers: ["Flipkart", "Uber", "Swiggy", "AI Startups"],
      keySkills: ["Build and train AI models", "Work with text and language understanding", "Process and clean large datasets", "Turn ideas into working AI products"],
      postgradEdge: "You can realistically apply for MS in AI or Machine Learning at universities in the US, UK, or Canada after this degree.",
    },
  },

  {
    id: "cse-core-google",
    name: "CSE Core (Google Cloud & IIT KGP)",
    degree: "B.Tech Computer Science (CSE)",
    tagline: "IIT-calibre core engineering, cloud-ready from graduation",
    realStrengths: [
      "Curriculum co-designed with IIT Kharagpur",
      "Google Cloud certification pathway embedded across all 4 years",
      "Research exposure through IIT KGP joint lab access",
      "Top-tier placement outcomes via combined industry-academia network",
    ],
    labs: ["IIT KGP Joint Lab", "Google Cloud Infrastructure Centre", "Research Computing Studio"],
    curriculumHighlights: [
      "Advanced Data Structures",
      "IIT KGP: Computer Architecture",
      "Google Cloud Platform Core",
      "Distributed Computing",
      "Software Systems Design",
      "Research Methodology (IIT KGP)",
      "Joint Capstone Project",
    ],
    overlapNote:
      "Shares the same foundational engineering core as Regular CSE in years 1–2. IIT KGP modules and Google Cloud track activate from semester 3.",
    comparisonStats: {
      topRoles: ["Cloud Engineer", "Solutions Architect", "Software Developer", "Research Engineer"],
      demandSignal: "Very few graduates come out with both a Google Cloud certification and IIT-level training — companies notice that combination and pay for it.",
      saturation: "Low",
      salaryRange: "₹10–18 lakh per year",
      careerCeiling: ["Cloud Engineer in year 1–2", "Senior Architect by year 5–7", "VP of Engineering or CTO possible in 12–15 years"],
      topHirers: ["Google", "Amazon AWS", "Microsoft", "Deloitte"],
      keySkills: ["Build and manage cloud infrastructure", "Design how large software systems connect", "Earn industry-recognised cloud certifications", "Work on real projects from day one"],
      postgradEdge: "The IIT Kharagpur collaboration genuinely strengthens your M.Tech or MS applications — it's not just a name drop, it carries weight.",
    },
  },

  // ── BCA: source courses ────────────────────────────────────────────────────

  {
    id: "bca",
    name: "BCA",
    degree: "Bachelor of Computer Applications (BCA)",
    tagline: "Your launchpad into the software world",
    realStrengths: [
      "Practical, application-focused curriculum for quick industry entry",
      "Strong programming and web development foundation",
      "Shorter pathway to software roles than B.Tech",
      "Active placement support from year 2",
    ],
    labs: ["Programming Lab", "Web Development Studio", "Database Lab"],
    curriculumHighlights: [
      "Programming Fundamentals",
      "Web Development",
      "Database Management",
      "Software Engineering",
      "Operating Systems",
      "Networking Basics",
      "Final Project",
    ],
    overlapNote:
      "80% shared core with BCA Data Science & AI (IBM) in years 1–2. The IBM specialisation diverges from semester 4.",
    comparisonStats: {
      topRoles: ["Software Developer", "Web Developer", "Software Tester", "IT Support Executive"],
      demandSignal: "Plenty of entry-level software jobs exist, but salaries start modest — you'll need to keep building skills to grow your income over time.",
      saturation: "High",
      salaryRange: "₹3–5 lakh per year",
      careerCeiling: ["Junior Developer in year 1–2", "Senior Developer or Team Lead by year 7–8", "Project Manager in 10+ years"],
      topHirers: ["Cognizant", "HCL", "Mphasis", "Wipro"],
      keySkills: ["Build websites and web apps", "Write code in Java or Python", "Store and manage data using databases", "Test software to find and fix bugs"],
      postgradEdge: "You can do MCA (Master of Computer Applications) after BCA — it adds 2 years but opens the door to better-paying senior roles.",
    },
  },

  // ── BBA: source courses ────────────────────────────────────────────────────

  {
    id: "bba",
    name: "BBA",
    degree: "Bachelor of Business Administration (BBA)",
    tagline: "Develop the business mind of tomorrow",
    realStrengths: [
      "Comprehensive business curriculum covering finance, marketing, and operations",
      "Industry exposure through internships from year 2",
      "Strong MBA feeder programme for those going for postgrad",
      "Broad foundation that works across all business domains",
    ],
    labs: ["Business Simulation Lab", "Finance & Analytics Studio"],
    curriculumHighlights: [
      "Principles of Management",
      "Financial Accounting",
      "Marketing Management",
      "Business Economics",
      "Human Resource Management",
      "Operations Management",
      "Final Year Project",
    ],
    overlapNote:
      "85% shared core with BBA Business Analytics (IBM) in years 1–2. Analytics specialisation diverges strongly in year 3.",
    comparisonStats: {
      topRoles: ["Management Trainee", "Sales Executive", "HR Executive", "Operations Executive"],
      demandSignal: "Business graduates are everywhere — you can find a job, but reaching a leadership role without an MBA will be a slow climb.",
      saturation: "High",
      salaryRange: "₹3–5 lakh per year",
      careerCeiling: ["Executive or Trainee in year 1–2", "Senior Manager by year 8–10", "Director or Regional Head in 12–15 years (usually needs MBA)"],
      topHirers: ["FMCG companies", "Banks", "Retail chains", "Consulting firms"],
      keySkills: ["Understand how businesses make money", "Manage marketing and sales campaigns", "Handle HR and people management", "Plan and run business operations"],
      postgradEdge: "An MBA after BBA is almost expected for leadership roles — the good news is BBA is the perfect foundation for a strong MBA application.",
    },
  },

  // ── B.Tech CSE: target courses (not shown in dropdown) ────────────────────

  {
    id: "cse-google-iit",
    name: "CSE (Google Cloud & IIT KGP)",
    degree: "B.Tech Computer Science (CSE)",
    tagline: "Industry-grade CSE, backed by Google and IIT Kharagpur",
    realStrengths: [
      "Google Cloud certifications integrated into the curriculum",
      "Joint modules designed with IIT Kharagpur faculty",
      "Live project exposure on Google Cloud Platform from year 2",
      "Preferred hiring pipeline with Google Cloud partner companies",
    ],
    labs: ["Google Cloud Lab", "IIT KGP Joint Research Studio", "Cloud Architecture Centre"],
    curriculumHighlights: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management",
      "Google Cloud Fundamentals",
      "IIT KGP: Advanced Software Engineering",
      "Cloud DevOps & Architecture",
      "Industry Capstone (Google Cloud)",
    ],
    overlapNote:
      "90% shared core with Regular CSE in years 1–2. Diverges from semester 5 with Google Cloud and IIT KGP specialisation modules.",
    comparisonStats: {
      topRoles: ["Cloud Engineer", "Solutions Architect", "Software Developer", "Platform Engineer"],
      demandSignal: "Cloud jobs are growing faster than companies can fill them — if you have a Google Cloud certification and an IIT-backed degree, you'll be in high demand.",
      saturation: "Low",
      salaryRange: "₹9–16 lakh per year",
      careerCeiling: ["Cloud Engineer in year 1–2", "Senior Architect by year 5–7", "VP of Engineering possible in 12–15 years"],
      topHirers: ["Google", "Amazon AWS", "Microsoft", "Deloitte"],
      keySkills: ["Build and manage cloud systems", "Design how large apps are hosted online", "Earn Google Cloud certification during your degree", "Work on live industry projects from year 2"],
      postgradEdge: "The IIT Kharagpur collaboration is a genuine advantage when applying for M.Tech or MS abroad — it adds real weight to your profile.",
    },
  },

  {
    id: "cse-aiml-google",
    name: "CSE AI-ML (Google Cloud)",
    degree: "B.Tech Computer Science (CSE)",
    tagline: "Build AI at scale — with Google infrastructure from day one",
    realStrengths: [
      "AI/ML curriculum enhanced with Google Cloud AI tools and certification tracks",
      "Hands-on VertexAI, BigQuery ML, and TensorFlow on GCP",
      "Live project deployments on Google Cloud infrastructure",
      "Premium hiring access to Google Cloud partner ecosystem",
    ],
    labs: ["AI & ML Research Lab", "Google Cloud AI Studio", "MLOps Deployment Centre"],
    curriculumHighlights: [
      "Machine Learning Theory",
      "Deep Learning & Neural Networks",
      "Google Cloud AI Platform",
      "NLP & Computer Vision",
      "MLOps on Google Cloud",
      "AI Product Development",
      "Industry Capstone (GCP)",
    ],
    overlapNote:
      "Shares ~85% core with Regular CSE AI-ML in years 1–2. Google Cloud track adds deployment and productionisation skills unavailable in the base programme.",
    comparisonStats: {
      topRoles: ["AI Developer", "Cloud AI Engineer", "Machine Learning Engineer", "AI Product Manager"],
      demandSignal: "Very few people can both build AI models and deploy them on the cloud — that combination is exactly what top companies are searching for right now.",
      saturation: "Low",
      salaryRange: "₹12–20 lakh per year",
      careerCeiling: ["AI Developer in year 1–2", "AI Team Lead or Architect by year 5–6", "Head of AI or Principal Engineer in 10–12 years"],
      topHirers: ["Google", "Microsoft", "Amazon", "Meta AI"],
      keySkills: ["Build AI models and put them into real products", "Deploy AI applications on Google Cloud", "Earn Google Cloud AI certification", "Work on production-level AI projects during college"],
      postgradEdge: "Having hands-on Google Cloud experience is a genuine advantage when applying for MS in AI programs in the US or UK.",
    },
  },

  {
    id: "cse-ds",
    name: "CSE Data Science",
    degree: "B.Tech Computer Science (CSE)",
    tagline: "Turn raw data into decisions that matter",
    realStrengths: [
      "Statistics-first curriculum grounded in real-world data problems",
      "Business analytics and data storytelling built into the core",
      "Live project partnerships with analytics firms from year 3",
      "Dual skill set: software engineering + domain-level analytics",
    ],
    labs: ["Data Analytics Lab", "Business Intelligence Studio", "Statistical Computing Centre"],
    curriculumHighlights: [
      "Probability & Statistics",
      "Data Wrangling & Visualisation",
      "Machine Learning Applications",
      "Big Data Technologies",
      "Business Intelligence",
      "Predictive Modelling",
      "Industry Capstone",
    ],
    overlapNote:
      "75% shared core with CSE AI-ML in years 1–2. Diverges strongly from year 3 with analytics and domain focus.",
    comparisonStats: {
      topRoles: ["Data Scientist", "Business Analyst", "Data Analyst", "Research Analyst"],
      demandSignal: "Companies across every industry — banking, healthcare, retail — are hiring people who can make sense of data, and there aren't enough of them yet.",
      saturation: "Medium",
      salaryRange: "₹7–13 lakh per year",
      careerCeiling: ["Data Analyst in year 1–2", "Analytics Lead by year 5–6", "Chief Data Officer or Analytics Director in 12–15 years"],
      topHirers: ["McKinsey", "BCG", "Mu Sigma", "KPMG Analytics"],
      keySkills: ["Analyse and interpret large datasets", "Use statistics to solve real business problems", "Create charts and reports that help companies decide", "Write code to process and clean data"],
      postgradEdge: "This degree sets you up well for MS in Data Science abroad or an MBA with analytics focus — both are realistic options.",
    },
  },

  {
    id: "cse-cloud",
    name: "CSE Cloud Computing",
    degree: "B.Tech Computer Science (CSE)",
    tagline: "Architect the cloud — at any scale",
    realStrengths: [
      "Deep specialisation in cloud architecture, DevOps, and distributed systems",
      "Multi-cloud exposure: AWS, Azure, and Google Cloud in the curriculum",
      "Industry certifications embedded into coursework",
      "Strong placement pipeline to cloud and infrastructure companies",
    ],
    labs: ["Multi-Cloud Lab", "DevOps Automation Studio", "Distributed Systems Centre"],
    curriculumHighlights: [
      "Data Structures & Algorithms",
      "Cloud Architecture & Design",
      "AWS & Azure Fundamentals",
      "DevOps & CI/CD Pipelines",
      "Containerisation & Kubernetes",
      "Cloud Security",
      "Capstone Cloud Project",
    ],
    overlapNote:
      "80% shared core with CSE AI-ML in years 1–2. Cloud specialisation begins semester 5 with deep infrastructure focus.",
    comparisonStats: {
      topRoles: ["Cloud Architect", "Cloud Engineer", "Infrastructure Engineer", "DevOps Engineer"],
      demandSignal: "Cloud computing is the fastest-growing part of the Indian IT industry right now, and companies can't find enough certified people to fill the roles.",
      saturation: "Low",
      salaryRange: "₹9–18 lakh per year",
      careerCeiling: ["Cloud Engineer in year 1–2", "Cloud Architect by year 5–6", "VP of Infrastructure or CTO in 12–15 years"],
      topHirers: ["Amazon AWS", "Microsoft Azure", "Google Cloud", "Accenture"],
      keySkills: ["Build and manage cloud servers and storage", "Keep large apps running reliably 24/7", "Earn cloud certifications from AWS, Azure, or Google", "Automate how software gets tested and deployed"],
      postgradEdge: "A strong fit for MS in Cloud Computing or Distributed Systems — your certifications and hands-on projects make applications stand out.",
    },
  },

  // ── BCA: target courses ────────────────────────────────────────────────────

  {
    id: "bca-ds-ai-ibm",
    name: "BCA Data Science & AI (IBM)",
    degree: "Bachelor of Computer Applications (BCA)",
    tagline: "BCA + IBM's AI toolkit — a combination the market is hiring for",
    realStrengths: [
      "IBM-certified AI and Data Science modules built into the degree",
      "Hands-on IBM Watson and IBM Cloud projects",
      "Direct exposure to IBM hiring channels and partner companies",
      "Practical AI skills without a 4-year B.Tech commitment",
    ],
    labs: ["IBM AI Lab", "Data Science Studio", "IBM Cloud Practice Centre"],
    curriculumHighlights: [
      "Programming & Python",
      "IBM Data Science Fundamentals",
      "Machine Learning with IBM Watson",
      "Data Visualisation",
      "IBM Cloud Essentials",
      "AI Applications Development",
      "IBM Capstone Project",
    ],
    overlapNote:
      "80% shared core with Regular BCA in years 1–2. IBM AI & Data Science specialisation makes years 2–3 substantially different.",
    comparisonStats: {
      topRoles: ["Data Analyst", "AI Associate", "Business Intelligence Analyst", "Junior Data Scientist"],
      demandSignal: "An IBM certification at BCA level is rare — most peers won't have it, and that alone gets your resume noticed at big companies.",
      saturation: "Low",
      salaryRange: "₹5–9 lakh per year",
      careerCeiling: ["Data Analyst in year 1–2", "Data Science Lead by year 6–7", "Analytics Manager in 10–12 years"],
      topHirers: ["IBM", "Capgemini", "EY Analytics", "Mu Sigma"],
      keySkills: ["Analyse data and find useful patterns", "Build basic AI and ML models", "Create visual dashboards companies actually use", "Work with IBM's industry-standard AI tools"],
      postgradEdge: "Your IBM certification is recognised by many universities and can strengthen your application for MS in Data Science programs.",
    },
  },

  // ── BBA: target courses ────────────────────────────────────────────────────

  {
    id: "bba-analytics-ibm",
    name: "BBA Business Analytics (IBM)",
    degree: "Bachelor of Business Administration (BBA)",
    tagline: "Business intuition, backed by data science — powered by IBM",
    realStrengths: [
      "Business analytics curriculum co-developed with IBM",
      "Hands-on training in IBM Cognos, SPSS, and IBM Planning Analytics",
      "Data-driven decision making integrated into every business module",
      "Employers actively seek this combination — business + analytics is rare at BBA level",
    ],
    labs: ["IBM Analytics Lab", "Business Intelligence Studio", "Data Storytelling Centre"],
    curriculumHighlights: [
      "Business Statistics & Analytics",
      "IBM Cognos & Business Intelligence",
      "Marketing Analytics",
      "Financial Modelling",
      "Supply Chain Analytics",
      "IBM Capstone: Business Strategy with Data",
      "Decision Sciences",
    ],
    overlapNote:
      "85% shared core with Regular BBA in years 1–2. IBM analytics tools and data-driven modules begin from semester 4.",
    comparisonStats: {
      topRoles: ["Business Analyst", "Strategy Analyst", "Marketing Analyst", "Consulting Associate"],
      demandSignal: "Companies want people who understand both business and data — and very few BBA graduates can do both, which makes you stand out immediately.",
      saturation: "Low",
      salaryRange: "₹6–10 lakh per year",
      careerCeiling: ["Business Analyst in year 1–2", "Analytics Manager or Strategy Lead by year 6–7", "Head of Business Intelligence in 10–12 years"],
      topHirers: ["Deloitte", "PwC", "BCG", "EY"],
      keySkills: ["Use data to help businesses make smarter decisions", "Build financial models and business forecasts", "Present findings in clear charts and reports", "Work with IBM's business analytics tools"],
      postgradEdge: "Coming into an MBA with IBM analytics experience genuinely separates you from other applicants — most MBA programmes actively want this profile.",
    },
  },
];

// ─── Route Map ───────────────────────────────────────────────────────────────

export const routeMap: RouteMap = {
  // Category: B.Tech CSE
  cse: {
    destinationCourseId: "cse-google-iit",
    pitchAngle:
      "You're already choosing CSE — the Google Cloud & IIT KGP track costs nothing extra and opens every door the regular programme does, plus the ones reserved for certified cloud engineers. The first two years are identical; the specialisation only makes the degree stronger.",
  },

  "cse-aiml": {
    conditionalRoutes: [
      {
        anyOf: [
          { signalKey: "interest", signalValue: "analyzing" },
          { signalKey: "goal", signalValue: "research" },
        ],
        destinationCourseId: "cse-ds",
        pitchAngle:
          "Your instincts are analytical and research-oriented — that's the exact profile Data Science is built for. You get the statistical rigour and domain depth that pure AI & ML doesn't cover, with the same engineering foundation underneath.",
      },
      {
        anyOf: [
          { signalKey: "interest", signalValue: "building" },
          { signalKey: "goal", signalValue: "industry" },
        ],
        destinationCourseId: "cse-cloud",
        pitchAngle:
          "Builders headed to industry are the profile cloud infrastructure companies hire for. CSE AI-ML teaches you the models — Cloud Computing teaches you to deploy them at scale, run them reliably, and get hired by the companies doing it at Google/AWS/Azure level.",
      },
    ],
    destinationCourseId: "cse-aiml-google",
    pitchAngle:
      "If you're already picking CSE AI-ML, the Google Cloud track costs nothing extra and is the difference between training models locally and deploying them in production. The first two years are identical — but years 3 and 4 put you in a completely different hiring bracket.",
  },

  "cse-core-google": {
    destinationCourseId: "cse-aiml-google",
    pitchAngle:
      "The Google Cloud foundation you'd get in CSE Core is even more powerful inside the AI & ML programme — because you're not just using the cloud, you're building the AI systems that run on it. Same Google infrastructure, dramatically higher ceiling.",
  },

  // Category: BCA
  bca: {
    destinationCourseId: "bca-ds-ai-ibm",
    pitchAngle:
      "A regular BCA gets you into software roles. BCA with IBM's Data Science & AI track gets you into the roles companies are actively struggling to fill. The base curriculum is the same — you're just adding a layer that the market is paying a premium for.",
  },

  // Category: BBA
  bba: {
    destinationCourseId: "bba-analytics-ibm",
    pitchAngle:
      "Business intuition is valuable. Business intuition backed by IBM-certified analytics skills is what gets you into strategy, consulting, and leadership roles in the first three years of your career instead of year ten. The core BBA is the same — you're upgrading the outcome.",
  },
};

// ─── Interest Signals ─────────────────────────────────────────────────────────

export const signals: Signal[] = [
  {
    key: "interest",
    question: "In school, which of these did you enjoy more?",
    options: [
      { value: "building", label: "Making things — apps, projects, experiments" },
      { value: "analyzing", label: "Finding patterns — maths, stats, puzzles" },
      { value: "both", label: "Honestly, both equally" },
    ],
  },
  {
    key: "goal",
    question: "What's your dream after finishing college?",
    options: [
      { value: "research", label: "Go for a Master's degree or do research" },
      { value: "industry", label: "Get a job at a well-known company" },
      { value: "startup", label: "Start my own business or app" },
    ],
  },
  {
    key: "style",
    question: "When you get stuck on something, you usually:",
    options: [
      { value: "creative", label: "Try a completely new angle or idea" },
      { value: "logical", label: "Break it down step by step" },
      { value: "mixed", label: "Depends on the situation" },
    ],
  },
];

// ─── Signal → Strength Mapping ───────────────────────────────────────────────

export const signalToStrengths: Record<string, Record<string, string[]>> = {
  cse: {
    "interest:building": ["Hands-on labs in OS, networking, databases, and cloud", "Broad software engineering foundation covering systems, networks, and security"],
    "interest:analyzing": ["Flexible elective stream — specialise in your final year"],
    "interest:both": ["Broad software engineering foundation covering systems, networks, and security", "Flexible elective stream — specialise in your final year"],
    "goal:research": ["Flexible elective stream — specialise in your final year"],
    "goal:industry": ["Strong alumni network across product and service companies", "Hands-on labs in OS, networking, databases, and cloud"],
    "goal:startup": ["Broad software engineering foundation covering systems, networks, and security"],
    "style:creative": ["Flexible elective stream — specialise in your final year"],
    "style:logical": ["Hands-on labs in OS, networking, databases, and cloud"],
    "style:mixed": ["Broad software engineering foundation covering systems, networks, and security"],
  },
  "cse-aiml": {
    "interest:building": ["Industry projects from year 2 onwards", "Strong pipeline to AI-first startups and product companies"],
    "interest:analyzing": ["Specialised curriculum covering deep learning, NLP, and computer vision", "Dedicated AI/ML lab with GPU clusters for hands-on model training"],
    "interest:both": ["Specialised curriculum covering deep learning, NLP, and computer vision", "Strong pipeline to AI-first startups and product companies"],
    "goal:research": ["Dedicated AI/ML lab with GPU clusters for hands-on model training", "Specialised curriculum covering deep learning, NLP, and computer vision"],
    "goal:industry": ["Strong pipeline to AI-first startups and product companies", "Industry projects from year 2 onwards"],
    "goal:startup": ["Strong pipeline to AI-first startups and product companies"],
    "style:creative": ["Specialised curriculum covering deep learning, NLP, and computer vision"],
    "style:logical": ["Dedicated AI/ML lab with GPU clusters for hands-on model training"],
    "style:mixed": ["Specialised curriculum covering deep learning, NLP, and computer vision"],
  },
  "cse-core-google": {
    "interest:building": ["Google Cloud certification pathway embedded across all 4 years"],
    "interest:analyzing": ["Research exposure through IIT KGP joint lab access"],
    "interest:both": ["Curriculum co-designed with IIT Kharagpur"],
    "goal:research": ["Research exposure through IIT KGP joint lab access", "Curriculum co-designed with IIT Kharagpur"],
    "goal:industry": ["Top-tier placement outcomes via combined industry-academia network", "Google Cloud certification pathway embedded across all 4 years"],
    "goal:startup": ["Google Cloud certification pathway embedded across all 4 years"],
    "style:creative": ["Google Cloud certification pathway embedded across all 4 years"],
    "style:logical": ["Curriculum co-designed with IIT Kharagpur"],
    "style:mixed": ["Curriculum co-designed with IIT Kharagpur"],
  },
  "cse-google-iit": {
    "interest:building": ["Live project exposure on Google Cloud Platform from year 2", "Google Cloud certifications integrated into the curriculum"],
    "interest:analyzing": ["Joint modules designed with IIT Kharagpur faculty"],
    "interest:both": ["Google Cloud certifications integrated into the curriculum", "Joint modules designed with IIT Kharagpur faculty"],
    "goal:research": ["Joint modules designed with IIT Kharagpur faculty"],
    "goal:industry": ["Preferred hiring pipeline with Google Cloud partner companies", "Live project exposure on Google Cloud Platform from year 2"],
    "goal:startup": ["Google Cloud certifications integrated into the curriculum"],
    "style:creative": ["Live project exposure on Google Cloud Platform from year 2"],
    "style:logical": ["Joint modules designed with IIT Kharagpur faculty"],
    "style:mixed": ["Google Cloud certifications integrated into the curriculum"],
  },
  "cse-aiml-google": {
    "interest:building": ["Live project deployments on Google Cloud infrastructure", "AI/ML curriculum enhanced with Google Cloud AI tools and certification tracks"],
    "interest:analyzing": ["Hands-on VertexAI, BigQuery ML, and TensorFlow on GCP"],
    "interest:both": ["AI/ML curriculum enhanced with Google Cloud AI tools and certification tracks", "Hands-on VertexAI, BigQuery ML, and TensorFlow on GCP"],
    "goal:research": ["Hands-on VertexAI, BigQuery ML, and TensorFlow on GCP"],
    "goal:industry": ["Premium hiring access to Google Cloud partner ecosystem", "Live project deployments on Google Cloud infrastructure"],
    "goal:startup": ["Live project deployments on Google Cloud infrastructure"],
    "style:creative": ["AI/ML curriculum enhanced with Google Cloud AI tools and certification tracks"],
    "style:logical": ["Hands-on VertexAI, BigQuery ML, and TensorFlow on GCP"],
    "style:mixed": ["AI/ML curriculum enhanced with Google Cloud AI tools and certification tracks"],
  },
  "cse-ds": {
    "interest:building": ["Live project partnerships with analytics firms from year 3"],
    "interest:analyzing": ["Statistics-first curriculum grounded in real-world data problems", "Business analytics and data storytelling built into the core"],
    "interest:both": ["Dual skill set: software engineering + domain-level analytics"],
    "goal:research": ["Statistics-first curriculum grounded in real-world data problems"],
    "goal:industry": ["Live project partnerships with analytics firms from year 3", "Business analytics and data storytelling built into the core"],
    "goal:startup": ["Dual skill set: software engineering + domain-level analytics"],
    "style:creative": ["Business analytics and data storytelling built into the core"],
    "style:logical": ["Statistics-first curriculum grounded in real-world data problems"],
    "style:mixed": ["Dual skill set: software engineering + domain-level analytics"],
  },
  "cse-cloud": {
    "interest:building": ["Deep specialisation in cloud architecture, DevOps, and distributed systems", "Multi-cloud exposure: AWS, Azure, and Google Cloud in the curriculum"],
    "interest:analyzing": ["Multi-cloud exposure: AWS, Azure, and Google Cloud in the curriculum"],
    "interest:both": ["Deep specialisation in cloud architecture, DevOps, and distributed systems"],
    "goal:research": ["Industry certifications embedded into coursework"],
    "goal:industry": ["Strong placement pipeline to cloud and infrastructure companies", "Industry certifications embedded into coursework"],
    "goal:startup": ["Multi-cloud exposure: AWS, Azure, and Google Cloud in the curriculum"],
    "style:creative": ["Deep specialisation in cloud architecture, DevOps, and distributed systems"],
    "style:logical": ["Deep specialisation in cloud architecture, DevOps, and distributed systems", "Industry certifications embedded into coursework"],
    "style:mixed": ["Multi-cloud exposure: AWS, Azure, and Google Cloud in the curriculum"],
  },
  bca: {
    "interest:building": ["Practical, application-focused curriculum for quick industry entry", "Strong programming and web development foundation"],
    "interest:analyzing": ["Active placement support from year 2"],
    "interest:both": ["Practical, application-focused curriculum for quick industry entry"],
    "goal:research": ["Shorter pathway to software roles than B.Tech"],
    "goal:industry": ["Active placement support from year 2", "Strong programming and web development foundation"],
    "goal:startup": ["Practical, application-focused curriculum for quick industry entry"],
    "style:creative": ["Strong programming and web development foundation"],
    "style:logical": ["Practical, application-focused curriculum for quick industry entry"],
    "style:mixed": ["Active placement support from year 2"],
  },
  "bca-ds-ai-ibm": {
    "interest:building": ["Hands-on IBM Watson and IBM Cloud projects"],
    "interest:analyzing": ["IBM-certified AI and Data Science modules built into the degree", "Practical AI skills without a 4-year B.Tech commitment"],
    "interest:both": ["IBM-certified AI and Data Science modules built into the degree", "Hands-on IBM Watson and IBM Cloud projects"],
    "goal:research": ["IBM-certified AI and Data Science modules built into the degree"],
    "goal:industry": ["Direct exposure to IBM hiring channels and partner companies", "Hands-on IBM Watson and IBM Cloud projects"],
    "goal:startup": ["Practical AI skills without a 4-year B.Tech commitment"],
    "style:creative": ["Hands-on IBM Watson and IBM Cloud projects"],
    "style:logical": ["IBM-certified AI and Data Science modules built into the degree"],
    "style:mixed": ["IBM-certified AI and Data Science modules built into the degree"],
  },
  bba: {
    "interest:building": ["Industry exposure through internships from year 2"],
    "interest:analyzing": ["Strong MBA feeder programme for those going for postgrad"],
    "interest:both": ["Comprehensive business curriculum covering finance, marketing, and operations"],
    "goal:research": ["Strong MBA feeder programme for those going for postgrad"],
    "goal:industry": ["Industry exposure through internships from year 2", "Broad foundation that works across all business domains"],
    "goal:startup": ["Broad foundation that works across all business domains"],
    "style:creative": ["Comprehensive business curriculum covering finance, marketing, and operations"],
    "style:logical": ["Strong MBA feeder programme for those going for postgrad"],
    "style:mixed": ["Broad foundation that works across all business domains"],
  },
  "bba-analytics-ibm": {
    "interest:building": ["Data-driven decision making integrated into every business module"],
    "interest:analyzing": ["Business analytics curriculum co-developed with IBM", "Hands-on training in IBM Cognos, SPSS, and IBM Planning Analytics"],
    "interest:both": ["Business analytics curriculum co-developed with IBM", "Data-driven decision making integrated into every business module"],
    "goal:research": ["Hands-on training in IBM Cognos, SPSS, and IBM Planning Analytics"],
    "goal:industry": ["Employers actively seek this combination — business + analytics is rare at BBA level", "Business analytics curriculum co-developed with IBM"],
    "goal:startup": ["Data-driven decision making integrated into every business module"],
    "style:creative": ["Data-driven decision making integrated into every business module"],
    "style:logical": ["Hands-on training in IBM Cognos, SPSS, and IBM Planning Analytics"],
    "style:mixed": ["Business analytics curriculum co-developed with IBM"],
  },
};

// ─── Route resolution helper ──────────────────────────────────────────────────

export function resolveRoute(
  sourceCourseId: string,
  userSignals: Record<string, string>
): { destinationCourseId: string; pitchAngle: string } | null {
  const config = routeMap[sourceCourseId];
  if (!config) return null;

  if (config.conditionalRoutes) {
    for (const route of config.conditionalRoutes) {
      const matched = route.anyOf.some(
        (cond) => userSignals[cond.signalKey] === cond.signalValue
      );
      if (matched) {
        return { destinationCourseId: route.destinationCourseId, pitchAngle: route.pitchAngle };
      }
    }
  }

  return { destinationCourseId: config.destinationCourseId, pitchAngle: config.pitchAngle };
}
