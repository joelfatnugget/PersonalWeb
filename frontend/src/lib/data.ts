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
            "Architected and deployed an end-to-end Generative AI testing suite using Python and React, automating the generation of complex test scenarios. This initiative reduced the manual effort for test case creation from 8,000 to just 50 man-hours, delivering a massive 98% efficiency gain for the QA team.",
            "Designed and implemented a custom Retrieval-Augmented Generation (RAG) pipeline to query internal technical documentation. Integrated vector embeddings and LLMs to produce accurate context-aware responses, enabling the team to deliver a successful live product demo to stakeholders within 5 months.",
            "Developed a full-stack dashboard to automate the analysis of GTLIG (Global Transaction Log) data. Replaced error-prone manual Excel workflows with a real-time visualization tool, significantly improving the speed and accuracy of transaction anomaly detection."
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
            "Enhanced the Visa Test Portal's frontend architecture using React and TypeScript, optimizing component rendering and state management to improve load times and overall user experience for external clients.",
            "Played a critical role in the product release cycle by identifying, triaging, and resolving over 9 high-priority defects during the final UAT phase, ensuring a seamless production rollout without critical regressions.",
            "Championed a fintech innovation proposal during the APAC Case Competition, leading a cross-functional team to develop a prototype that won 1st Place for its potential to drive new revenue streams."
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
            "Engineered a robust automated patch management system for Azure Virtual Machines using Jenkins CI/CD pipelines and Shell scripting. This solution standardized the patching process and reduced monthly manual maintenance overhead by approximately 70%.",
            "Conducted in-depth technical evaluations of security protocols including JWT Caching strategies and mTLS implementation for over 10 critical internal APIs. Produced detailed technical reports guiding the architectural decisions for the bank's cloud infrastructure.",
            "Authored and maintained comprehensive Cloud Operation Guidelines and Standard Operating Procedures (SOPs), serving as the primary training resource for new hires and ensuring operational compliance across the engineering team."
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
            "Collaborated directly with regional product managers to define the roadmap for the 'Insight App', translating business requirements into technical specifications for the APAC market expansion.",
            "Implemented key mobile features using React Native, including interactive data visualizations and user preference modules, ensuring feature parity across both iOS and Android platforms.",
            "Developed a predictive Machine Learning model using Python (Scikit-learn) to analyze historical sales data, providing leadership with actionable forecasts for the upcoming quarter's revenue performance."
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
            "Led the QA strategy for the mobile booking application, executing comprehensive test plans that identified critical UI/UX friction points and functional defects prior to public release.",
            "Utilized advanced network analysis tools like Burp Suite to intercept and inspect API request/response payloads, enabling the backend team to pinpoint root causes of latency and data inconsistency issues.",
            "Managed the defect lifecycle for over 30 reported bugs, working closely with developers to reproduce issues, verify fixes, and ensure high-quality software delivery."
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
            "Managed the end-to-end lifecycle of IT assets, performing hardware upgrades and software configurations to optimize workstation performance for corporate staff.",
            "Revolutionized the workstation provisioning process by developing PowerShell automation scripts. This initiative reduced the setup time per machine by 70%, allowing the IT team to meet aggressive onboarding targets.",
            "Spearheaded a department-wide initiative to analyze support ticket trends, implementing process improvements that reduced average resolution time and improved internal user satisfaction."
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