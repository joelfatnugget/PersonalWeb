import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Project, Experience } from "./data";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
    if (!dateStr || dateStr === 'Present') return dateStr;
    
    const [year, month] = dateStr.split('-');
    if (!year || !month) return dateStr;

    const date = new Date(parseInt(year), parseInt(month) - 1);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function highlightImpact(text: string): string {
    return text.replace(/(\d+%|\d+(?:st|nd|rd|th)|~?\d+[\d,]*\+?)/g, 
        '<span class="font-bold text-primary-600 dark:text-primary-400">$1</span>'
    );
}

export function calculateStaggerDelay(index: number, baseDelay: number = 100, step: number = 80): number {
    return baseDelay + (index * step);
}

export function sortProjectsForGrid(projectsList: Project[]): Project[] {
    const featured = projectsList.filter(p => p.featured);
    const standard = projectsList.filter(p => !p.featured);

    const result: Project[] = [];
    let fIndex = 0;
    let sIndex = 0;

    // Interleave [Featured (2 cols), Standard (1 col)] so each 3-col row is perfectly filled
    while (fIndex < featured.length || sIndex < standard.length) {
        if (fIndex < featured.length) {
            result.push(featured[fIndex++]);
        }
        if (sIndex < standard.length) {
            result.push(standard[sIndex++]);
        }
    }

    return result;
}

export function filterProjects(projects: Project[], query: string = '', category: string = 'All'): Project[] {
    const q = query.trim().toLowerCase();
    const matched = projects.filter(project => {
        const matchesCategory = category === 'All' || 
            project.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()));

        const matchesQuery = !q || 
            project.title.toLowerCase().includes(q) ||
            project.description.toLowerCase().includes(q) ||
            project.tags.some(tag => tag.toLowerCase().includes(q));

        return matchesCategory && matchesQuery;
    });

    if (!q && category === 'All') {
        return sortProjectsForGrid(matched);
    }
    return matched;
}

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    type: 'page' | 'experience' | 'project';
    url: string;
    badge?: string;
}

export function searchPortfolio(query: string, experiences: Experience[] = [], projects: Project[] = []): SearchResult[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    // Static pages
    const pages = [
        { id: 'page-home', title: 'Home', description: 'Landing page and overview', type: 'page' as const, url: '/' },
        { id: 'page-experience', title: 'Experience', description: 'Career timeline & work history', type: 'page' as const, url: '/experience' },
        { id: 'page-projects', title: 'Projects', description: 'Featured work & bento gallery', type: 'page' as const, url: '/projects' },
        { id: 'page-resume', title: 'Resume', description: 'Web-native interactive resume', type: 'page' as const, url: '/resume' },
        { id: 'page-applications', title: 'Applications', description: 'Custom applications showcase', type: 'page' as const, url: '/applications' },
    ];

    for (const page of pages) {
        if (page.title.toLowerCase().includes(q) || page.description.toLowerCase().includes(q)) {
            results.push(page);
        }
    }

    // Experiences
    for (const exp of experiences) {
        if (
            exp.role.toLowerCase().includes(q) ||
            exp.company.toLowerCase().includes(q) ||
            exp.description.some(d => d.toLowerCase().includes(q)) ||
            exp.skills.some(s => s.toLowerCase().includes(q))
        ) {
            results.push({
                id: exp.id,
                title: `${exp.role} @ ${exp.company}`,
                description: exp.description[0] || '',
                type: 'experience',
                url: `/experience#${exp.id}`,
                badge: exp.company
            });
        }
    }

    // Projects
    for (const proj of projects) {
        if (
            proj.title.toLowerCase().includes(q) ||
            proj.description.toLowerCase().includes(q) ||
            proj.tags.some(t => t.toLowerCase().includes(q))
        ) {
            results.push({
                id: proj.id,
                title: proj.title,
                description: proj.description,
                type: 'project',
                url: `/projects#${proj.id}`,
                badge: proj.tags[0]
            });
        }
    }

    return results;
}
