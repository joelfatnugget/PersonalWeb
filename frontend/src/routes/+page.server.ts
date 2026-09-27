import type { PageServerLoad } from './$types';
import { parseBlogRss, parseBloodDataFromMarkdown } from '$lib/utils';
import { blogSpotlight } from '$lib/data';

export const load: PageServerLoad = async ({ fetch }) => {
    // 1. Dynamically Fetch RSS Feed from blog.joelfatnugget.xyz
    let dynamicPosts = blogSpotlight.featuredPosts;
    try {
        const rssRes = await fetch('https://blog.joelfatnugget.xyz/rss.xml');
        if (rssRes.ok) {
            const xmlText = await rssRes.text();
            const parsed = parseBlogRss(xmlText);
            if (parsed.length > 0) {
                dynamicPosts = parsed;
            }
        }
    } catch (e) {
        console.warn('Failed to fetch dynamic RSS feed from blog.joelfatnugget.xyz, using fallback', e);
    }

    // 2. Fetch Blood Bank Level Data
    let bloodData: Array<{ type: string; level: string }> = [];
    let updatedAt = 'Unknown Date';
    try {
        const response = await fetch('https://raw.githubusercontent.com/joelfatnugget/BloodBankLevel/main/README.md');
        if (response.ok) {
            const text = await response.text();
            const parsed = parseBloodDataFromMarkdown(text);
            bloodData = parsed.bloodData;
            updatedAt = parsed.updatedAt;
        }
    } catch (error) {
        console.error('Error fetching blood data:', error);
    }

    return {
        blogPosts: dynamicPosts,
        bloodData,
        updatedAt
    };
};