import type { ComponentType } from 'svelte';
import { 
    CodeXml, 
    Database, 
    Layout, 
    Server, 
    Settings, 
    Smartphone, 
    Globe, 
    Box,
    Terminal
} from 'lucide-svelte';

import visaLogo from '$lib/assets/logos/visa.png';
import smbcLogo from '$lib/assets/logos/smbc.jpeg';
import alignLogo from '$lib/assets/logos/align.jpeg';
import cdgLogo from '$lib/assets/logos/comfortdelgro.png';

// --- Interfaces ---

export interface Skill {
    name: string;
    icon: string; // Iconify string (e.g., "logos:svelte-icon") or Lucide component name if using dynamic component rendering
    category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface Experience {
    id: string; // Unique ID for deep linking (e.g., 'job-google-2024')
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
    description?: string[]; // Optional for awards/details like "Dean's List"
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[]; // Technologies used
    link?: string; // Live URL
    github?: string; // Repo URL
    image: string; // Placeholder or screenshot URL
    featured: boolean; // For the Bento Grid "Large" cells
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
    about: "I'm a software engineer passionate about building scalable web applications and intuitive user interfaces. I specialize in the modern JavaScript stack and love solving complex problems with simple, elegant solutions.",
    email: "contact@example.com",
    location: "Singapore",
    url: "https://www.linkedin.com/in/joeltanec/"
};

export const skills: Skill[] = [
    { name: "React", icon: "logos:react", category: "frontend" },
    { name: "Vue", icon: "logos:vue", category: "frontend" },
    { name: "Next.js", icon: "logos:nextjs-icon", category: "frontend" },
    { name: "TypeScript", icon: "logos:typescript-icon", category: "tools" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", category: "frontend" },
    { name: "Node.js", icon: "logos:nodejs-icon", category: "backend" },
    { name: "Python", icon: "logos:python", category: "backend" },
    { name: "PostgreSQL", icon: "logos:postgresql", category: "backend" },
    { name: "MySQL", icon: "logos:mysql", category: "backend" },
    { name: "Docker", icon: "logos:docker-icon", category: "tools" },
    { name: "RabbitMQ", icon: "logos:rabbitmq-icon", category: "backend" },
    { name: "Kong", icon: "logos:kong-icon", category: "backend" },
    { name: "Stripe", icon: "logos:stripe", category: "backend" },
    { name: "Firebase", icon: "logos:firebase", category: "backend" },
    { name: "Jest", icon: "logos:jest", category: "tools" },
    { name: "Git", icon: "logos:git-icon", category: "tools" },
    { name: "Figma", icon: "logos:figma", category: "design" },
    { name: "AWS", icon: "logos:aws", category: "tools" },
    { name: "Azure", icon: "logos:azure-icon", category: "tools" },
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
            "Led end-to-end Generative AI app development, slashing test case creation from 8,000 to 50 man-hours (98% efficiency gain).",
            "Built custom RAG pipeline with cutting-edge AI, enabling first live demo in 5 months from initial Git commit.",
            "Automated GTLIG analysis via fullstack solution, revolutionizing manual workflows."
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
            "Improved functionality and user experience of the customer-facing Visa Test Portal.",
            "Ensured smooth product rollout by resolving over 9 critical bugs in one week.",
            "Achieved 1st Place in the APAC Case Competition, collaborating with cross-functional teams."
        ],
        skills: ["React", "TypeScript", "Tailwind CSS"],
        color: "#1336CC",
        logo: visaLogo
    },
    {
        id: "exp-smbc-intern-2023",
        role: "Security & Architecture Intern",
        company: "Sumitomo Mitsui Banking Corporation",
        location: "Singapore",
        startDate: "2023-05",
        endDate: "2023-07",
        description: [
            "Engineered automated patch deployment for Virtual Machines using Jenkins pipelines, reducing manual effort by ~70%.",
            "Led evaluation of critical Proof of Concepts (JWT Caching, mTLS) for 10+ APIs across cloud infrastructure.",
            "Authored comprehensive Cloud Operation Guidelines to standardize training and operational procedures."
        ],
        skills: ["Shell", "Python", "Azure"],
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
            "Worked with regional management to shape Insight App capabilities and standards across APAC.",
            "Translated high-level specifications into new/enhanced mobile application features.",
            "Developed a Machine Learning Model to predict next quarter's sales."
        ],
        skills: ["Python", "React Native"],
        color: "#0099CD",
        logo: alignLogo
    },
    {
        id: "exp-cdg-qa-2021",
        role: "QA Tester (Adhoc)",
        company: "ComfortDelGro",
        location: "Singapore",
        startDate: "2021-12",
        endDate: "2022-12",
        description: [
            "Led Quality Assurance and testing, identifying critical defects and sub-optimal UX issues.",
            "Used network troubleshooting tools (Burp Suite) to intercept and analyze API traffic.",
            "Resolved over 30 reported software bugs, improving application quality."
        ],
        skills: ["Testing", "API Analysis"],
        color: "#FBC02D",
        logo: cdgLogo
    },
    {
        id: "exp-cdg-support-2021",
        role: "Support Specialist",
        company: "ComfortDelGro",
        location: "Singapore",
        startDate: "2021-02",
        endDate: "2021-07",
        description: [
            "Optimized IT infrastructure through building and upgrading hardware/software.",
            "Drove 70% efficiency gains by deploying an automated computer installation process using PowerShell.",
            "Spearheaded system and process improvements based on rigorous analysis."
        ],
        skills: ["PowerShell", "IT Infrastructure"],
        color: "#FBC02D",
        logo: cdgLogo
    }
];

export const education: Education[] = [
    {
        institution: "Singapore Management University",
        degree: "BSc (Information Systems)",
        location: "Singapore",
        startDate: "2021-08",
        endDate: "2025-08",
        description: [
            "Major in Digitalisation & Cloud Solutions"
        ]
    },
    {
        institution: "Anglo-Chinese Junior College",
        degree: "GCE A-Levels",
        location: "Singapore",
        startDate: "2018-01",
        endDate: "2019-12",
        description: ["Physics, Chemistry, Mathematics, Economics"]
    }
];

export const achievements = [
    "1st in CFC Hackathon (https://bitly.ws/37EaK)"
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
    { platform: "X", url: "https://twitter.com", icon: "simple-icons:x" },
    { platform: "Email", url: "mailto:contact@example.com", icon: "mdi:email" }
];