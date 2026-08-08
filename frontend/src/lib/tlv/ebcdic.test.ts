import { describe, it, expect } from 'vitest';
import { 
    ebcdicToLiteral, 
    literalToEbcdic, 
    getSupportedCodePages, 
    hexToBytes, 
    bytesToHex,
    getCodePageTable
} from './ebcdic';

describe('IBM Character Set (EBCDIC) Converter', () => {
    it('returns supported IBM code pages list', () => {
        const codePages = getSupportedCodePages();
        expect(codePages).toBeDefined();
        expect(codePages.length).toBeGreaterThan(0);
        expect(codePages.some(cp => cp.id === 'IBM037')).toBe(true);
        expect(codePages.some(cp => cp.id === 'IBM500')).toBe(true);
        expect(codePages.some(cp => cp.id === 'IBM1047')).toBe(true);
    });

    it('converts EBCDIC hex string to literal string for IBM037', () => {
        const hex = 'C8C5D3D3D640E6D6D9D3C440F1F2F3';
        const literal = ebcdicToLiteral(hex, 'IBM037');
        expect(literal).toBe('HELLO WORLD 123');
    });

    it('converts literal string to EBCDIC hex string for IBM037', () => {
        const text = 'HELLO WORLD 123';
        const hex = literalToEbcdic(text, 'IBM037');
        expect(hex.toUpperCase()).toBe('C8C5D3D3D640E6D6D9D3C440F1F2F3');
    });

    it('handles IBM500 differences correctly', () => {
        const hexIBM500 = '4A5A';
        const literal500 = ebcdicToLiteral(hexIBM500, 'IBM500');
        expect(literal500).toBe('[]');

        const hexIBM037 = 'BABB';
        const literal037 = ebcdicToLiteral(hexIBM037, 'IBM037');
        expect(literal037).toBe('[]');
    });

    it('handles ASCII mode seamlessly', () => {
        const asciiHex = '41424320313233';
        const literal = ebcdicToLiteral(asciiHex, 'ASCII');
        expect(literal).toBe('ABC 123');

        const encodedHex = literalToEbcdic('ABC 123', 'ASCII');
        expect(encodedHex.toUpperCase()).toBe(asciiHex);
    });

    it('performs bidirectional conversion losslessly for alphanumeric text', () => {
        const sampleText = 'TESTING 1234567890 IBM MAINFRAME';
        const codePages = ['IBM037', 'IBM500', 'IBM1047', 'IBM273', 'ASCII'] as const;

        for (const cp of codePages) {
            const hex = literalToEbcdic(sampleText, cp);
            const decoded = ebcdicToLiteral(hex, cp);
            expect(decoded).toBe(sampleText);
        }
    });

    it('converts byte arrays to hex and back correctly', () => {
        const bytes = new Uint8Array([0xc8, 0xc5, 0xd3, 0xd3, 0xd6]);
        const hex = bytesToHex(bytes);
        expect(hex.toUpperCase()).toBe('C8C5D3D3D6');

        const parsedBytes = hexToBytes('C8C5D3D3D6');
        expect(Array.from(parsedBytes)).toEqual([0xc8, 0xc5, 0xd3, 0xd3, 0xd6]);
    });

    it('generates full 256-byte Code Page matrix table with control mnemonics', () => {
        const table = getCodePageTable('IBM1047');
        expect(table).toHaveLength(256);
        expect(table[0x00].hex).toBe('00');
        expect(table[0x00].mnemonic).toBe('NUL');
        expect(table[0x0B].hex).toBe('0B');
        expect(table[0x0B].mnemonic).toBe('VT'); // Vertical Tab!
        expect(table[0x0D].mnemonic).toBe('CR');
        expect(table[0x15].mnemonic).toBe('NL');
        expect(table[0x40].mnemonic).toBe('SP');
        expect(table[0x40].char).toBe(' ');
        expect(table[0xC1].char).toBe('A');
        expect(table[0xC1].dec).toBe(193);
        expect(table[0xC1].binary).toBe('11000001');
        expect(table[0xF0].char).toBe('0');
    });
});
