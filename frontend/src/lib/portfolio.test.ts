import { describe, it, expect } from 'vitest';
import { formatDate, filterProjects, searchPortfolio, highlightImpact, calculateStaggerDelay, sortProjectsForGrid } from './utils';
import type { Project, Experience } from './data';

describe('Portfolio Utility Functions', () => {
    describe('formatDate', () => {
        it('formats YYYY-MM to Month Year correctly', () => {
            expect(formatDate('2025-06')).toBe('June 2025');
            expect(formatDate('2023-01')).toBe('January 2023');
        });

        it('returns "Present" as is', () => {
            expect(formatDate('Present')).toBe('Present');
        });

        it('handles empty or malformed strings gracefully', () => {
            expect(formatDate('')).toBe('');
            expect(formatDate('InvalidDate')).toBe('InvalidDate');
        });
    });

    describe('filterProjects', () => {
        const mockProjects: Project[] = [
            {
                id: '1',
                title: 'ESDeezknee Theme Park',
                description: 'Microservices architecture theme park ticketing system',
                tags: ['Python', 'Docker', 'RabbitMQ', 'Kong'],
                featured: true,
                image: 'test1.jpg'
            },
            {
                id: '2',
                title: 'Skill Issue',
                description: 'Role portal for internal hiring',
                tags: ['Next.js', 'Python', 'Tailwind CSS', 'PostgreSQL'],
                featured: true,
                image: 'test2.jpg'
            },
            {
                id: '3',
                title: 'Pet Society',
                description: 'Connecting pet owners with sitters',
                tags: ['Vue', 'Firebase', 'Google Maps API'],
                featured: false,
                image: 'test3.jpg'
            }
        ];

        it('returns all projects when category is "All" and query is empty', () => {
            const result = filterProjects(mockProjects, '', 'All');
            expect(result).toHaveLength(3);
        });

        it('filters projects by category tag', () => {
            const pythonProjects = filterProjects(mockProjects, '', 'Python');
            expect(pythonProjects).toHaveLength(2);
            expect(pythonProjects.map(p => p.id)).toEqual(['1', '2']);

            const vueProjects = filterProjects(mockProjects, '', 'Vue');
            expect(vueProjects).toHaveLength(1);
            expect(vueProjects[0].id).toBe('3');
        });

        it('filters projects by text query', () => {
            const queryResult = filterProjects(mockProjects, 'pet', 'All');
            expect(queryResult).toHaveLength(1);
            expect(queryResult[0].title).toBe('Pet Society');
        });

        it('combines text query and category filtering', () => {
            const result = filterProjects(mockProjects, 'hiring', 'Python');
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('2');
        });
    });

    describe('sortProjectsForGrid', () => {
        const mockProjects: Project[] = [
            { id: '1', title: 'A', description: '', tags: [], featured: true, image: '' },
            { id: '2', title: 'B', description: '', tags: [], featured: true, image: '' },
            { id: '3', title: 'C', description: '', tags: [], featured: false, image: '' },
            { id: '4', title: 'D', description: '', tags: [], featured: true, image: '' },
            { id: '5', title: 'E', description: '', tags: [], featured: false, image: '' },
        ];

        it('interleaves 2-column featured cards and 1-column cards for optimal CSS grid flow', () => {
            const sorted = sortProjectsForGrid(mockProjects);
            expect(sorted).toHaveLength(5);
            // First item should be featured
            expect(sorted[0].featured).toBe(true);
            // Second item should be standard (1 col) to fill col 3 of row 1
            expect(sorted[1].featured).toBe(false);
        });
    });

    describe('searchPortfolio', () => {
        const mockExperiences: Experience[] = [
            {
                id: 'exp-1',
                role: 'Fullstack Developer',
                company: 'Visa Inc',
                location: 'Singapore',
                startDate: '2025-06',
                endDate: 'Present',
                description: ['Built GenAI automation pipeline with Python and React.'],
                skills: ['Python', 'React', 'TypeScript']
            }
        ];

        const mockProjects: Project[] = [
            {
                id: 'proj-1',
                title: 'ESDeezknee',
                description: 'Microservices solution',
                tags: ['Python', 'Docker'],
                featured: true,
                image: 'test.png'
            }
        ];

        it('returns matching pages, experiences, and projects for a query', () => {
            const results = searchPortfolio('Visa', mockExperiences, mockProjects);
            expect(results.some(r => r.title.includes('Visa'))).toBe(true);
        });

        it('returns blog link when searching for blog', () => {
            const results = searchPortfolio('blog', mockExperiences, mockProjects);
            expect(results.some(r => r.url === 'https://blog.joelfatnugget.xyz/')).toBe(true);
        });

        it('returns empty list for non-matching query', () => {
            const results = searchPortfolio('NonExistentQuery123', mockExperiences, mockProjects);
            expect(results).toHaveLength(0);
        });
    });

    describe('Blog Data Integration', () => {
        it('includes Blog in social links with correct URL', async () => {
            const { socials } = await import('./data');
            const blogSocial = socials.find(s => s.platform.toLowerCase() === 'blog');
            expect(blogSocial).toBeDefined();
            expect(blogSocial?.url).toBe('https://blog.joelfatnugget.xyz/');
        });

        it('ensures all social links have valid icon and platform attributes', async () => {
            const { socials } = await import('./data');
            for (const social of socials) {
                expect(social.platform).toBeTruthy();
                expect(social.icon).toBeTruthy();
                expect(social.url).toBeTruthy();
            }
        });

        it('includes blog link for Lessons To Payment project', async () => {
            const { projects } = await import('./data');
            const paymentBlogProject = projects.find(p => p.id === 'proj-lessons-to-payment');
            expect(paymentBlogProject).toBeDefined();
            expect(paymentBlogProject?.link).toBe('https://blog.joelfatnugget.xyz/');
        });

        it('exports blogSpotlight data with valid blog URL and topics', async () => {
            const { blogSpotlight } = await import('./data');
            expect(blogSpotlight).toBeDefined();
            expect(blogSpotlight.url).toBe('https://blog.joelfatnugget.xyz/');
            expect(blogSpotlight.topics.length).toBeGreaterThan(0);
            expect(blogSpotlight.featuredPosts.some(p => p.url.includes('/blog/lessons-to-payment'))).toBe(true);
        });
    });

    describe('parseBlogRss', () => {
        const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0">
            <channel>
                <title>Test Blog</title>
                <item>
                    <title>Day 1: Test Article</title>
                    <link>https://blog.joelfatnugget.xyz/blog/day-1</link>
                    <description>Sample description for day 1</description>
                    <pubDate>Mon, 20 Jul 2026 00:00:00 GMT</pubDate>
                </item>
                <item>
                    <title>Day 9: Message Routing</title>
                    <link>https://blog.joelfatnugget.xyz/blog/day-9</link>
                    <description>Sample description for day 9 message routing</description>
                    <pubDate>Tue, 28 Jul 2026 00:00:00 GMT</pubDate>
                </item>
            </channel>
        </rss>`;

        it('parses RSS XML and orders articles descending by pubDate', async () => {
            const { parseBlogRss } = await import('./utils');
            const posts = parseBlogRss(sampleXml);
            expect(posts).toHaveLength(2);
            expect(posts[0].title).toBe('Day 9: Message Routing');
            expect(posts[0].url).toBe('https://blog.joelfatnugget.xyz/blog/day-9');
            expect(posts[1].title).toBe('Day 1: Test Article');
        });

        it('handles malformed or empty RSS XML gracefully', async () => {
            const { parseBlogRss } = await import('./utils');
            expect(parseBlogRss('')).toEqual([]);
            expect(parseBlogRss('<invalid>xml</invalid>')).toEqual([]);
        });
    });

    describe('Applications Hub', () => {
        it('includes Applications search result in searchPortfolio', async () => {
            const { searchPortfolio } = await import('./utils');
            const results = searchPortfolio('Applications');
            expect(results.some(r => r.id === 'page-applications')).toBe(true);
        });
    });

    describe('highlightImpact', () => {
        it('wraps metrics and percentages in bold styled span', () => {
            const input = 'Achieved 98% reduction across 8,000 man-hours.';
            const highlighted = highlightImpact(input);
            expect(highlighted).toContain('98%');
            expect(highlighted).toContain('8,000');
            expect(highlighted).toContain('<span class="font-bold');
        });
    });

    describe('calculateStaggerDelay', () => {
        it('calculates millisecond delay based on index', () => {
            expect(calculateStaggerDelay(0, 100, 80)).toBe(100);
            expect(calculateStaggerDelay(1, 100, 80)).toBe(180);
            expect(calculateStaggerDelay(3, 100, 80)).toBe(340);
        });
    });

    describe('getBloodStockStatus', () => {
        it('classifies Healthy and High as healthy status with green badge', async () => {
            const { getBloodStockStatus } = await import('./utils');
            const healthy = getBloodStockStatus('Healthy');
            expect(healthy.status).toBe('healthy');
            expect(healthy.label).toBe('Healthy');
            expect(healthy.badgeClass).toContain('green');

            const high = getBloodStockStatus('High');
            expect(high.status).toBe('healthy');
            expect(high.label).toBe('High');
            expect(high.badgeClass).toContain('green');
        });

        it('classifies Moderate with yellow badge', async () => {
            const { getBloodStockStatus } = await import('./utils');
            const moderate = getBloodStockStatus('Moderate');
            expect(moderate.status).toBe('moderate');
            expect(moderate.label).toBe('Moderate');
            expect(moderate.badgeClass).toContain('yellow');
        });

        it('classifies Low, Critical, and unknown with red badge', async () => {
            const { getBloodStockStatus } = await import('./utils');
            const low = getBloodStockStatus('Low');
            expect(low.status).toBe('critical');
            expect(low.label).toBe('Low');
            expect(low.badgeClass).toContain('red');

            const critical = getBloodStockStatus('Critical');
            expect(critical.status).toBe('critical');
            expect(critical.label).toBe('Critical');
            expect(critical.badgeClass).toContain('red');
        });
    });

    describe('parseBloodDataFromMarkdown', () => {
        const sampleMarkdown = `
Singapore Blood Levels
 Please donate to the Blood Bank if you are able to do so!
================================================================================================================================

### Blood Levels (Updated: 28 Sep 2026 00:24:16 GMT+8)
> Red Cross Singapore official update: 25 September 2026

| Blood Type | Level     |
|------------|-----------|
| A+     | Healthy |
| B+     | High |
| B-     | Moderate |
| O-     | Critical |
        `;

        it('extracts official update timestamp and blood stock records', async () => {
            const { parseBloodDataFromMarkdown } = await import('./utils');
            const result = parseBloodDataFromMarkdown(sampleMarkdown);
            expect(result.updatedAt).toBe('25 September 2026');
            expect(result.bloodData).toEqual([
                { type: 'A+', level: 'Healthy' },
                { type: 'B+', level: 'High' },
                { type: 'B-', level: 'Moderate' },
                { type: 'O-', level: 'Critical' }
            ]);
        });

        it('falls back to scraper timestamp when official update line is absent', async () => {
            const { parseBloodDataFromMarkdown } = await import('./utils');
            const legacyMarkdown = `### Blood Levels (Updated: 27 Sep 2026 12:00:26 GMT+8)
| Blood Type | Level     |
|------------|-----------|
| A+     | Healthy |`;
            const result = parseBloodDataFromMarkdown(legacyMarkdown);
            expect(result.updatedAt).toBe('27 Sep 2026 12:00:26 GMT+8');
            expect(result.bloodData).toHaveLength(1);
        });

        it('handles empty or malformed markdown gracefully', async () => {
            const { parseBloodDataFromMarkdown } = await import('./utils');
            const result = parseBloodDataFromMarkdown('');
            expect(result.updatedAt).toBe('Unknown Date');
            expect(result.bloodData).toEqual([]);
        });
    });
});

