import visaLogo from '$lib/assets/logos/visa.png';
import smbcLogo from '$lib/assets/logos/smbc.jpeg';
import alignLogo from '$lib/assets/logos/align.jpeg';
import cdgLogo from '$lib/assets/logos/comfortdelgro.png';

// --- Interfaces ---

export interface Skill {
    name: string;
    icon: string; // Iconify string
    category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface Experience {
    id: string; // Unique ID for deep linking
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string; // 'Present' or 'YYYY-MM'
    description: string[];
    skills: string[]; // Matches Skill.name
    logo?: string; // URL to company logo
    color?: string; // Brand color hex code
}

export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    location: string;
    description?: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[]; // Technologies used
    link?: string; // Live URL
    github?: string; // Repo URL
    image: string; // Screenshot URL
    featured: boolean; // Bento Grid featured status
}

export interface Social {
    platform: string;
    url: string;
    icon: string; // Iconify string
}

export interface BlogPostPreview {
    title: string;
    excerpt: string;
    tag: string;
    readTime: string;
    url: string;
}

export interface BlogSpotlight {
    title: string;
    subtitle: string;
    description: string;
    url: string;
    featuredPosts: BlogPostPreview[];
    topics: string[];
}

export interface ResumeSkillCategory {
    category: string;
    items: string[];
}

export interface DeveloperApplication {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    path: string;
    status: 'Live App' | 'In Development' | 'Planned';
    isLive: boolean;
    category: string;
    featured?: boolean;
    badgeColor?: string;
    tags: string[];
    capabilities: string[];
    previewSnippet?: {
        title: string;
        inputLabel: string;
        inputValue: string;
        outputRows: Array<{ label: string; value: string; tag?: string }>;
    };
}

// --- Data ---

export const personalInfo = {
    name: "Joel Tan",
    title: "Software Engineer",
    tagline: "Building digital experiences that matter.",
    about: "I'm a software engineer passionate about building scalable web applications and intuitive user interfaces. I specialize in fullstack engineering, Generative AI pipelines, and modern cloud architecture.",
    email: "joeltanec@gmail.com",
    phone: "+65 90605085",
    location: "Singapore",
    url: "https://www.linkedin.com/in/joeltanec/"
};

export const skills: Skill[] = [
    { name: "Python", icon: "logos:python", category: "backend" },
    { name: "React", icon: "logos:react", category: "frontend" },
    { name: "JavaScript", icon: "logos:javascript", category: "frontend" },
    { name: "TypeScript", icon: "logos:typescript-icon", category: "tools" },
    { name: "Node.js", icon: "logos:nodejs-icon", category: "backend" },
    { name: "Docker", icon: "logos:docker-icon", category: "tools" },
    { name: "AWS", icon: "logos:aws", category: "tools" },
    { name: "Azure", icon: "logos:azure-icon", category: "tools" },
    { name: "MySQL", icon: "logos:mysql", category: "backend" },
    { name: "Git", icon: "logos:git-icon", category: "tools" },
    { name: "Jenkins", icon: "logos:jenkins", category: "tools" },
    { name: "PHP", icon: "logos:php", category: "backend" },
    { name: "Java", icon: "logos:java", category: "backend" },
    { name: "SwiftUI", icon: "logos:swift", category: "frontend" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", category: "frontend" },
    { name: "Vue", icon: "logos:vue", category: "frontend" },
    { name: "Next.js", icon: "logos:nextjs-icon", category: "frontend" },
    { name: "PostgreSQL", icon: "logos:postgresql", category: "backend" },
    { name: "Firebase", icon: "logos:firebase", category: "backend" },
];

export const experiences: Experience[] = [
    {
        id: "exp-visa-fullstack-2025",
        role: "Fullstack Developer",
        company: "Visa Inc",
        location: "Singapore",
        startDate: "2025-06",
        endDate: "Present",
        description: [
            "Maintained and drove the success of the high-impact Visa Test Portal, serving 2,200+ monthly user subscriptions across major banking clients and merchants and facilitating 255,000+ transactions.",
            "Led end-to-end Generative AI development to automate GTLIG document analysis, slashing test case creation time by 98% (from 8,000 to 50 man-hours) for 1,000+ page technical documentation.",
            "Architected and deployed a custom RAG pipeline, delivering the first live demo within 5 months of initial commit to accelerate time-to-market."
        ],
        skills: ["Python", "React", "TypeScript", "Docker"],
        color: "#1336CC",
        logo: visaLogo
    },
    {
        id: "exp-visa-intern-2024",
        role: "Software Developer Intern",
        company: "Visa Inc",
        location: "Singapore",
        startDate: "2024-05",
        endDate: "2024-08",
        description: [
            "Engineered key enhancements to the Visa Test Portal’s UI/UX, directly improving usability and operational efficiency for an expansive global client network.",
            "Expedited product delivery cycles by diagnosing and resolving 9+ critical production defects within a single sprint, bolstering deployment stability and platform reliability.",
            "Championed collaborative innovation by leading a cross-functional team spanning Singapore and India to secure 1st place in the APAC Case Competition, demonstrating excellence in strategic technical problem-solving."
        ],
        skills: ["React", "TypeScript", "Tailwind CSS"],
        color: "#1336CC",
        logo: visaLogo
    },
    {
        id: "exp-smbc-intern-2023",
        role: "Security & Architecture Intern",
        company: "Sumitomo Mitsui Banking Corp",
        location: "Singapore",
        startDate: "2023-05",
        endDate: "2023-07",
        description: [
            "Engineered automated patch deployment for Virtual Machines using Jenkins pipelines (Shell/PowerShell), reducing manual effort by ~70%.",
            "Led evaluation of critical Proof of Concepts (JWT Caching, mTLS) and executed testing for 10+ APIs across cloud infrastructure.",
            "Authored enterprise Cloud Operation Guidelines across 10+ cloud APIs, creating a standardized onboarding knowledge base that reduced engineer ramp-up time."
        ],
        skills: ["Jenkins", "Python", "Azure"],
        color: "#A0D235",
        logo: smbcLogo
    },
    {
        id: "exp-align-intern-2023",
        role: "Mobile Development Intern",
        company: "Align Technology",
        location: "Singapore",
        startDate: "2023-01",
        endDate: "2023-04",
        description: [
            "Collaborated with regional leadership to execute feature roadmaps for the Insight App, optimizing operational capabilities across the APAC region.",
            "Developed a predictive Machine Learning model for quarterly sales forecasting, enhancing resource allocation accuracy and strategic planning."
        ],
        skills: ["Python", "React"],
        color: "#0099CD",
        logo: alignLogo
    },
    {
        id: "exp-cdg-support-qa-2021",
        role: "IT Support & QA Specialist",
        company: "ComfortDelGro",
        location: "Singapore",
        startDate: "2021-02",
        endDate: "2022-12",
        description: [
            "Developed automated computer deployment processes using PowerShell, driving a 70% efficiency gain.",
            "Conducted Quality Assurance testing for mobile applications, resolving 30+ critical bugs and performing API troubleshooting using Burp Suite."
        ],
        skills: ["JavaScript", "Docker"],
        color: "#FBC02D",
        logo: cdgLogo
    }
];

export const education: Education[] = [
    {
        institution: "Singapore Management University",
        degree: "MSc in IT and Business (Part-time)",
        location: "Singapore",
        startDate: "2026-08",
        endDate: "2028-08"
    },
    {
        institution: "Singapore Management University",
        degree: "BSc in Information Systems",
        location: "Singapore",
        startDate: "2021-08",
        endDate: "2025-08"
    }
];

export const achievements = [
    "1st in Code For Cities by SMU/IBM Hackathon"
];

export const projects: Project[] = [
    {
        id: "proj-esdeezknee",
        title: "ESDeezknee",
        description: "An immersive enterprise solution designed for theme parks to enhance visitor experiences. Features a microservices architecture handling ticketing, queues, and notifications.",
        tags: ["Python", "Docker", "RabbitMQ", "Kong", "Stripe"],
        github: "https://github.com/ESDeezknee/ESDeezknee",
        image: "https://user-images.githubusercontent.com/45414933/230269633-7ec3527b-85c3-4d05-822e-bc74c6fdbf35.gif",
        featured: true
    },
    {
        id: "proj-skill-issue",
        title: "Skill Issue (SBRP)",
        description: "A Skill-Based Role Portal for internal corporate hiring. Enables staff to apply for roles based on skill compatibility and assists HR in candidate selection.",
        tags: ["Next.js", "Python", "Tailwind CSS", "PostgreSQL"],
        github: "https://github.com/Skills-Issue/Skill-Issue",
        image: "https://user-images.githubusercontent.com/73370403/281028321-ad47dd76-2484-4539-b35f-64bd2f4dc91a.png",
        featured: true
    },
    {
        id: "proj-pet-society",
        title: "Pet Society",
        description: "A platform connecting pet owners with trusted pet sitters. Allows for listing creation, booking management, and profile verification.",
        tags: ["Vue", "Firebase", "Google Maps API"],
        github: "https://github.com/Cytan2000/pet-society",
        image: "https://placehold.co/600x400/1e293b/cbd5e1?text=Pet+Society+UI",
        featured: false
    },
    {
        id: "proj-lessons-to-payment",
        title: "Lessons To Payment",
        description: "A deep-dive technical blog exploring the inner workings of the payments industry, from ISO8583 standards to fraud scoring and message routing.",
        tags: ["Payments", "ISO8583", "FinTech", "Technical Writing"],
        link: "https://blog.joelfatnugget.xyz/",
        github: "https://github.com/joelfatnugget/LessonsToPayment",
        image: "https://raw.githubusercontent.com/joelfatnugget/LessonsToPayment/main/gif.gif",
        featured: true
    },
    {
        id: "proj-blood-bank",
        title: "Blood Bank Tracker",
        description: "An automated scraper that monitors national blood stock levels from the Red Cross and publishes real-time updates to GitHub, encouraging timely donations.",
        tags: ["Python", "GitHub Actions", "Web Scraping", "Tech for Good"],
        github: "https://github.com/joelfatnugget/BloodBankLevel",
        image: "https://raw.githubusercontent.com/joelfatnugget/BloodBankLevel/main/bloodbankLevelGIF.gif",
        featured: false
    },
    {
        id: "proj-personal-web",
        title: "Portfolio V2",
        description: "You're looking at it! A high-performance portfolio built with Svelte 5 and Tailwind v4, featuring 3D interactions and deep-linking.",
        tags: ["TypeScript", "Tailwind v4", "Vite"],
        github: "https://github.com/joelfatnugget/PersonalWeb",
        image: "https://placehold.co/600x400/0f172a/cbd5e1?text=Portfolio+V2",
        featured: false
    }
];

export const socials: Social[] = [
    { platform: "Blog", url: "https://blog.joelfatnugget.xyz/", icon: "lucide:newspaper" },
    { platform: "GitHub", url: "https://github.com/joelfatnugget", icon: "simple-icons:github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/joeltanec/", icon: "simple-icons:linkedin" },
    { platform: "Email", url: "mailto:joeltanec@gmail.com", icon: "mdi:email" }
];

export const blogSpotlight: BlogSpotlight = {
    title: "Lessons To Payment & Engineering Blog",
    subtitle: "In-Depth Technical Essays & System Architecture Insights",
    description: "Deep-dive technical writing breaking down complex domain knowledge—from payment processing protocols (ISO8583) and real-time fraud risk scoring to payment routing and hardware security.",
    url: "https://blog.joelfatnugget.xyz/",
    featuredPosts: [
        {
            title: "Day 9: Message Routing (in Payments Network)",
            excerpt: "How payment messages navigate from terminal to acquirer, scheme switch, and issuing bank.",
            tag: "Payment Architecture",
            readTime: "3 min read",
            url: "https://blog.joelfatnugget.xyz/blog/lessons-to-payment-day-9-message-routing/"
        },
        {
            title: "Day 8: EMV vs MagStripe",
            excerpt: "Understanding EMV microchip dynamic cryptograms, magnetic stripe skimming vulnerabilities, and the 2015 liability shift.",
            tag: "Security & Risk",
            readTime: "4 min read",
            url: "https://blog.joelfatnugget.xyz/blog/lessons-to-payment-day-8-emv-vs-magstripe/"
        },
        {
            title: "Day 7: Fraud Checks & Risk Scoring",
            excerpt: "Fraud detection in ISO8583 messages: Visa Advance Authorisation (VAA), Visa Risk Manager (VRM), and Mastercard Decision Intelligence.",
            tag: "Security & Risk",
            readTime: "5 min read",
            url: "https://blog.joelfatnugget.xyz/blog/lessons-to-payment-day-7-fraud-checks-risk-scoring/"
        },
        {
            title: "Day 2: 4 Party Model",
            excerpt: "Understanding the 4 Party Model with the Ya Kun coffee analogy: Cardholder, Merchant, Acquirer, and Issuer.",
            tag: "Payment Architecture",
            readTime: "3 min read",
            url: "https://blog.joelfatnugget.xyz/blog/lessons-to-payment-day-2-four-party-model/"
        }
    ],
    topics: ["ISO8583", "Payment Architecture", "Security & Risk", "EMV", "Visa VAA", "Message Routing"]
};

export const resumeSkills: ResumeSkillCategory[] = [
    { category: "Languages", items: ["Python", "PHP", "JavaScript", "TypeScript", "CSS", "Java"] },
    { category: "Tools", items: ["Docker", "AWS", "Azure", "MySQL", "Git", "Jenkins"] },
    { category: "Certifications", items: ["Heicoders AI100/200", "Smartcademy Data Analytics", "Google Cloud Fundamentals"] },
    { category: "Frameworks & Architecture", items: ["RAG", "REST APIs", "Microservices", "SwiftUI", "Node.js/Express", "React", "SvelteKit"] }
];

export const developerApplications: DeveloperApplication[] = [
    {
        id: 'tlv-parser',
        title: 'IBM Character Set TLV Parser',
        subtitle: 'BER-TLV Inspector & Mainframe EBCDIC Translator',
        description: 'Comprehensive developer utility to parse nested BER-TLV structures, inspect EMV tag hierarchies, explore 256-character IBM EBCDIC hex matrices, and perform bidirectional literal translations with 15+ IBM Code Pages.',
        path: '/applications/tlv-parser',
        status: 'Live App',
        isLive: true,
        featured: true,
        category: 'Mainframe & Banking',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        tags: ['IBM EBCDIC', 'BER-TLV', 'EMV ISO-7816', 'Hex Inspector', 'Mainframe'],
        capabilities: [
            '15+ IBM EBCDIC Code Pages (IBM037, IBM500, IBM1047, IBM273...)',
            'Recursive BER-TLV Nested Tree Visualizer & Tag Search',
            'Interactive 16x16 Hexadecimal Character Matrix Grid',
            'Bidirectional Hex <-> EBCDIC Raw Literal Converter'
        ],
        previewSnippet: {
            title: 'BER-TLV Inspector • IBM037 EBCDIC',
            inputLabel: 'EMV Hex Payload',
            inputValue: '6F1E 8407 A0000000031010 A513 500B C8C5D3D3D640E6D6D9D3C4 9F02 06 000000001000',
            outputRows: [
                { label: 'DF Name (AID)', value: 'A0000000031010 (Visa Credit/Debit)', tag: '84' },
                { label: 'Application Label', value: 'HELLO WORLD', tag: '50' },
                { label: 'Authorized Amount', value: '$10.00 (000000001000)', tag: '9F02' }
            ]
        }
    },
    {
        id: 'iso8583-packager',
        title: 'ISO 8583 Financial Switch Packager',
        subtitle: 'Bitfield Inspector & Message Switch Deconstructor',
        description: 'Interactive point-of-sale and ATM protocol packer supporting Primary & Secondary Bitmaps, MTI classification (0100, 0200, 0800), and variable-length field validation.',
        path: '#upcoming',
        status: 'In Development',
        isLive: false,
        featured: false,
        category: 'Mainframe & Banking',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        tags: ['ISO 8583', 'Bitmap Packing', 'MTI Routing', 'Switch Architecture'],
        capabilities: [
            'Primary & Secondary 64/128-bit Bitmap Grid Analysis',
            'LLVAR & LLLVAR Dynamic Length Field Decoding',
            'Field 55 EMV Chip & Field 48 Private Data Extraction'
        ]
    },
    {
        id: 'iso20022-swift-bridge',
        title: 'SWIFT MT & ISO 20022 Syntax Transformer',
        subtitle: 'Financial Messaging Mapper & Cross-Border Validator',
        description: 'Cross-standard mapper translating legacy FIN MT103 and MT202 messages into modern XML schemas (pacs.008, pacs.009, pain.001) with CBPR+ compliance rules.',
        path: '#upcoming',
        status: 'Planned',
        isLive: false,
        featured: false,
        category: 'Payments & Protocols',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        tags: ['ISO 20022', 'SWIFT MT103', 'pacs.008', 'CBPR+ Standards'],
        capabilities: [
            'MT-to-MX Block 4 Tag Mapping (Field 50K, 59, 71A)',
            'ISO 20022 XML Syntax Schema Validation',
            'High-Value Instant Settlement Rules Engine'
        ]
    }
];