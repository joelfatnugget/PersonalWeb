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
    { platform: "GitHub", url: "https://github.com/joelfatnugget", icon: "simple-icons:github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/joeltanec/", icon: "simple-icons:linkedin" },
    { platform: "Email", url: "mailto:joeltanec@gmail.com", icon: "mdi:email" }
];