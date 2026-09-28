import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Project, Experience, BlogPostPreview, DeveloperApplication } from "./data";

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
        { id: 'page-blog', title: 'Blog', description: 'Technical blog & insights at blog.joelfatnugget.xyz', type: 'page' as const, url: 'https://blog.joelfatnugget.xyz/' },
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

export function parseBlogRss(rssXml: string): (BlogPostPreview & { pubDate?: string })[] {
    if (!rssXml || typeof rssXml !== 'string') return [];

    const items: (BlogPostPreview & { pubDate?: string })[] = [];
    const itemMatches = rssXml.match(/<item>[\s\S]*?<\/item>/gi);
    if (!itemMatches) return [];

    for (const itemXml of itemMatches) {
        const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/i);
        const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/i);
        const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/i);
        const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

        if (!titleMatch || !linkMatch) continue;

        const rawTitle = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
        const rawLink = linkMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
        const rawDesc = descMatch ? descMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<[^>]*>/g, '').trim() : '';
        const rawPubDate = pubDateMatch ? pubDateMatch[1].trim() : '';

        const wordCount = rawDesc.split(/\s+/).filter(Boolean).length;
        const readTime = `${Math.max(2, Math.ceil(wordCount / 40))} min read`;

        let tag = "Technical Blog";
        const titleLower = rawTitle.toLowerCase();
        if (titleLower.includes("routing") || titleLower.includes("model") || titleLower.includes("acquirer")) {
            tag = "Payment Architecture";
        } else if (titleLower.includes("fraud") || titleLower.includes("emv") || titleLower.includes("pan") || titleLower.includes("security")) {
            tag = "Security & Risk";
        } else if (titleLower.includes("iso8583") || titleLower.includes("de4") || titleLower.includes("de7") || titleLower.includes("message")) {
            tag = "ISO 8583 & Messaging";
        }

        items.push({
            title: rawTitle,
            excerpt: rawDesc,
            tag,
            readTime,
            url: rawLink,
            pubDate: rawPubDate
        });
    }

    return items.sort((a, b) => {
        const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
        const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
        return dateB - dateA;
    });
}

export function updatePaletteIndex(currentIndex: number, key: string, totalItems: number): number {
    if (totalItems <= 1) return 0;
    if (key === 'ArrowDown') {
        return (currentIndex + 1) % totalItems;
    }
    if (key === 'ArrowUp') {
        return (currentIndex - 1 + totalItems) % totalItems;
    }
    return currentIndex;
}

export function formatProjectHash(id: string): string {
    if (!id) return '';
    return id.startsWith('#') ? id : `#${id}`;
}

export function parseProjectHash(hash: string): string | null {
    if (!hash) return null;
    const clean = hash.replace(/^#/, '').trim();
    return clean.length > 0 ? clean : null;
}

export function findProjectByHash(hash: string, projectsList: Project[]): Project | undefined {
    const id = parseProjectHash(hash);
    if (!id) return undefined;
    return projectsList.find(p => p.id === id || `proj-${p.id}` === id || p.id === `proj-${id}`);
}

export type BloodStockStatus = 'healthy' | 'moderate' | 'critical';

export interface BloodStockStatusInfo {
    label: string;
    status: BloodStockStatus;
    badgeClass: string;
}

export function getBloodStockStatus(level: string): BloodStockStatusInfo {
    const normalized = (level || '').trim().toLowerCase();
    if (normalized === 'healthy' || normalized === 'high') {
        return {
            label: level.trim() || 'Healthy',
            status: 'healthy',
            badgeClass: 'bg-green-500/20 text-green-300 border-green-500/30'
        };
    }
    if (normalized === 'moderate') {
        return {
            label: level.trim(),
            status: 'moderate',
            badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
        };
    }
    return {
        label: level.trim() || 'Critical',
        status: 'critical',
        badgeClass: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
}

export interface BloodDataEntry {
    type: string;
    level: string;
}

export interface ParsedBloodData {
    bloodData: BloodDataEntry[];
    updatedAt: string;
}

export function parseBloodDataFromMarkdown(markdownText: string): ParsedBloodData {
    if (!markdownText || typeof markdownText !== 'string') {
        return { bloodData: [], updatedAt: 'Unknown Date' };
    }

    const officialMatch = markdownText.match(/official update:\s*(.*?)(?:\n|\r|$)/i);
    const updateMatch = markdownText.match(/Updated: (.*?)\)/i);
    const updatedAt = officialMatch
        ? officialMatch[1].trim()
        : (updateMatch ? updateMatch[1].trim() : 'Unknown Date');

    const bloodData: BloodDataEntry[] = [];
    const lines = markdownText.split('\n');
    for (const line of lines) {
        const match = line.trim().match(/^\|\s*([A-Z]{1,2}[+-])\s*\|\s*(\w+)\s*\|$/);
        if (match) {
            bloodData.push({
                type: match[1],
                level: match[2]
            });
        }
    }

    return { bloodData, updatedAt };
}

export function filterDeveloperApplications(
    apps: DeveloperApplication[],
    query: string = '',
    category: string = 'All'
): DeveloperApplication[] {
    const q = query.trim().toLowerCase();
    return apps.filter(app => {
        const matchesCategory = category === 'All' || app.category.toLowerCase().includes(category.toLowerCase());
        const matchesQuery = !q ||
            app.title.toLowerCase().includes(q) ||
            app.subtitle.toLowerCase().includes(q) ||
            app.description.toLowerCase().includes(q) ||
            app.tags.some(tag => tag.toLowerCase().includes(q)) ||
            (app.capabilities && app.capabilities.some(cap => cap.toLowerCase().includes(q)));
        return matchesCategory && matchesQuery;
    });
}




