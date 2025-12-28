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
    location: "Singapore"
};

export const skills: Skill[] = [
    { name: "Svelte", icon: "logos:svelte-icon", category: "frontend" },
    { name: "React", icon: "logos:react", category: "frontend" },
    { name: "Vue", icon: "logos:vue", category: "frontend" },
    { name: "Next.js", icon: "logos:nextjs-icon", category: "frontend" },
    { name: "TypeScript", icon: "logos:typescript-icon", category: "tools" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon", category: "frontend" },
    { name: "Node.js", icon: "logos:nodejs-icon", category: "backend" },
    { name: "Python", icon: "logos:python", category: "backend" },
    { name: "Go", icon: "logos:go", category: "backend" },
    { name: "PHP", icon: "logos:php", category: "backend" },
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
];

export const experiences: Experience[] = [
    {
        id: "exp-tech-corp-2024",
        role: "Software Engineer",
        company: "Tech Corp",
        location: "Singapore",
        startDate: "2024-01",
        endDate: "Present",
        description: [
            "Developing high-performance web applications using modern frameworks.",
            "Collaborating with cross-functional teams to deliver scalable solutions.",
            "Optimizing frontend performance and user experience."
        ],
        skills: ["Svelte", "TypeScript", "Tailwind CSS"]
    }
];

export const projects: Project[] = [
    {
        id: "proj-esdeezknee",
        title: "ESDeezknee",
        description: "An immersive enterprise solution designed for theme parks to enhance visitor experiences. Features a microservices architecture handling ticketing, queues, and notifications.",
        tags: ["Python", "Go", "Docker", "RabbitMQ", "Kong", "Stripe"],
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
        description: "You're looking at it! A high-performance portfolio built with Svelte 5 Runes and Tailwind v4, featuring 3D interactions and deep-linking.",
        tags: ["Svelte 5", "Tailwind v4", "Vite"],
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