import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/joelfatnugget/BloodBankLevel/main/README.md');
        if (!response.ok) throw new Error('Failed to fetch README');
        const text = await response.text();

        // 1. Parse Timestamp
        // Matches: "### Blood Levels (Updated: 28 Dec 2025 09:55:10 GMT+8)"
        const updateMatch = text.match(/Updated: (.*?)\)/);
        const updatedAt = updateMatch ? updateMatch[1].trim() : 'Unknown Date';

        // 2. Parse Table
        // We look for rows starting with "|" followed by "Type" then "|" then "Level"
        const bloodData = [];
        
        // Split by lines and iterate
        const lines = text.split('\n');
        
        for (const line of lines) {
            // Regex explanation:
            // ^\|        -> Start of line, literal pipe
            // \s*        -> Optional whitespace
            // ([A-Z]{1,2}[+-]) -> Group 1: 1-2 letters (A, B, AB, O) followed by + or -
            // \s*        -> Optional whitespace
            // \|         -> Literal pipe
            // \s*        -> Optional whitespace
            // (\w+)      -> Group 2: Word (Healthy, Moderate, Critical)
            // \s*        -> Optional whitespace
            // \|         -> Literal pipe
            const match = line.trim().match(/^\|\s*([A-Z]{1,2}[+-])\s*\|\s*(\w+)\s*\|$/);
            
            if (match) {
                bloodData.push({
                    type: match[1],
                    level: match[2]
                });
            }
        }

        return {
            bloodData,
            updatedAt
        };

    } catch (error) {
        console.error('Error fetching blood data:', error);
        return {
            bloodData: [],
            updatedAt: 'Error fetching data'
        };
    }
};