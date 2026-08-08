export interface CodePageInfo {
    id: string;
    name: string;
    region: string;
    description: string;
}

export interface CodePageByteEntry {
    dec: number;
    hex: string;
    binary: string;
    char: string;
    mnemonic?: string;
    category: 'control' | 'letter' | 'digit' | 'symbol' | 'space';
}

export type SupportedCodePage = 
    | 'IBM037' 
    | 'IBM500' 
    | 'IBM1047' 
    | 'IBM273' 
    | 'IBM277' 
    | 'IBM278' 
    | 'IBM280' 
    | 'IBM284' 
    | 'IBM285' 
    | 'IBM297' 
    | 'IBM870' 
    | 'ASCII';

export const CODE_PAGES: CodePageInfo[] = [
    { id: 'IBM1047', name: 'IBM Code Page 1047', region: 'Open Systems', description: 'IBM Open System C/C++ EBCDIC' },
    { id: 'IBM037', name: 'IBM Code Page 037', region: 'US, Canada, Australia', description: 'Standard North American IBM Mainframe EBCDIC' },
    { id: 'IBM500', name: 'IBM Code Page 500', region: 'International', description: 'International / European IBM EBCDIC' },
    { id: 'IBM273', name: 'IBM Code Page 273', region: 'Germany, Austria', description: 'German EBCDIC with umlauts' },
    { id: 'IBM277', name: 'IBM Code Page 277', region: 'Denmark, Norway', description: 'Nordic Danish/Norwegian EBCDIC' },
    { id: 'IBM278', name: 'IBM Code Page 278', region: 'Finland, Sweden', description: 'Nordic Finnish/Swedish EBCDIC' },
    { id: 'IBM280', name: 'IBM Code Page 280', region: 'Italy', description: 'Italian EBCDIC' },
    { id: 'IBM284', name: 'IBM Code Page 284', region: 'Spain, Latin America', description: 'Spanish EBCDIC' },
    { id: 'IBM285', name: 'IBM Code Page 285', region: 'United Kingdom', description: 'UK EBCDIC with Pound (£) sign' },
    { id: 'IBM297', name: 'IBM Code Page 297', region: 'France', description: 'French EBCDIC' },
    { id: 'IBM870', name: 'IBM Code Page 870', region: 'Central Europe', description: 'Latin-2 Central European EBCDIC' },
    { id: 'ASCII', name: 'ASCII / UTF-8', region: 'Universal', description: 'Standard ASCII (ISO-8859-1 / UTF-8)' },
];

export function getSupportedCodePages(): CodePageInfo[] {
    return CODE_PAGES;
}

// Standard EBCDIC Control Mnemonics (0x00 - 0x3F and 0x40, 0xFF)
const EBCDIC_MNEMONICS: Record<number, string> = {
    0x00: 'NUL', 0x01: 'SOH', 0x02: 'STX', 0x03: 'ETX', 0x04: 'SEL', 0x05: 'HT',  0x06: 'RNL', 0x07: 'DEL',
    0x08: 'GE',  0x09: 'SPS', 0x0A: 'RPT', 0x0B: 'VT',  0x0C: 'FF',  0x0D: 'CR',  0x0E: 'SO',  0x0F: 'SI',
    0x10: 'DLE', 0x11: 'DC1', 0x12: 'DC2', 0x13: 'DC3', 0x14: 'RES', 0x15: 'NL',  0x16: 'BS',  0x17: 'POC',
    0x18: 'CAN', 0x19: 'EM',  0x1A: 'UBS', 0x1B: 'CU1', 0x1C: 'IFS', 0x1D: 'IGS', 0x1E: 'IRS', 0x1F: 'IUS',
    0x20: 'DS',  0x21: 'SOS', 0x22: 'FS',  0x23: 'WUI', 0x24: 'BYP', 0x25: 'LF',  0x26: 'ETB', 0x27: 'ESC',
    0x28: 'SA',  0x29: 'SFE', 0x2A: 'SM',  0x2B: 'CSP', 0x2C: 'MFA', 0x2D: 'ENQ', 0x2E: 'ACK', 0x2F: 'BEL',
    0x32: 'SYN', 0x34: 'PN',  0x35: 'RS',  0x36: 'UC',  0x37: 'EOT', 0x3C: 'DC4', 0x3D: 'NAK', 0x3F: 'SUB',
    0x40: 'SP',  0xFF: 'EO'
};

const ASCII_MNEMONICS: Record<number, string> = {
    0x00: 'NUL', 0x01: 'SOH', 0x02: 'STX', 0x03: 'ETX', 0x04: 'EOT', 0x05: 'ENQ', 0x06: 'ACK', 0x07: 'BEL',
    0x08: 'BS',  0x09: 'HT',  0x0A: 'LF',  0x0B: 'VT',  0x0C: 'FF',  0x0D: 'CR',  0x0E: 'SO',  0x0F: 'SI',
    0x10: 'DLE', 0x11: 'DC1', 0x12: 'DC2', 0x13: 'DC3', 0x14: 'DC4', 0x15: 'NAK', 0x16: 'SYN', 0x17: 'ETB',
    0x18: 'CAN', 0x19: 'EM',  0x1A: 'SUB', 0x1B: 'ESC', 0x1C: 'FS',  0x1D: 'GS',  0x1E: 'RS',  0x1F: 'US',
    0x20: 'SP',  0x7F: 'DEL'
};

// Build standard base EBCDIC to Unicode character array (256 entries) for IBM037
function createBaseEbcdicMap(): string[] {
    const map = new Array<string>(256).fill('?');

    // Controls
    map[0x00] = '\0';
    map[0x05] = '\t';
    map[0x0D] = '\r';
    map[0x15] = '\n';
    map[0x25] = '\n';
    map[0x40] = ' ';

    // Punctuation & symbols
    map[0x4B] = '.'; map[0x4C] = '<'; map[0x4D] = '('; map[0x4E] = '+'; map[0x4F] = '|';
    map[0x50] = '&'; map[0x5B] = '$'; map[0x5C] = '*'; map[0x5D] = ')'; map[0x5E] = ';'; map[0x5F] = '¬';
    map[0x60] = '-'; map[0x61] = '/'; map[0x6B] = ','; map[0x6C] = '%'; map[0x6D] = '_'; map[0x6E] = '>'; map[0x6F] = '?';
    map[0x79] = '`'; map[0x7A] = ':'; map[0x7B] = '#'; map[0x7C] = '@'; map[0x7D] = "'"; map[0x7E] = '='; map[0x7F] = '"';

    // Lowercase letters
    const lower = 'abcdefghi';
    for (let i = 0; i < 9; i++) map[0x81 + i] = lower[i];
    const lower2 = 'jklmnopqr';
    for (let i = 0; i < 9; i++) map[0x91 + i] = lower2[i];
    const lower3 = 'stuvwxyz';
    for (let i = 0; i < 8; i++) map[0xA2 + i] = lower3[i];

    // Uppercase letters
    const upper = 'ABCDEFGHI';
    for (let i = 0; i < 9; i++) map[0xC1 + i] = upper[i];
    const upper2 = 'JKLMNOPQR';
    for (let i = 0; i < 9; i++) map[0xD1 + i] = upper2[i];
    const upper3 = 'STUVWXYZ';
    for (let i = 0; i < 8; i++) map[0xE2 + i] = upper3[i];

    // Digits
    const digits = '0123456789';
    for (let i = 0; i < 10; i++) map[0xF0 + i] = digits[i];

    // Default IBM037 specifics
    map[0xBA] = '['; map[0xBB] = ']'; map[0xC0] = '{'; map[0xD0] = '}'; map[0xE0] = '\\';
    map[0xA1] = '~'; map[0xB0] = '^'; map[0x4A] = '¢'; map[0x5A] = '!';

    return map;
}

// Code page overrides on top of base map
const EBCDIC_MAPS: Record<string, string[]> = {
    IBM037: createBaseEbcdicMap(),
    IBM500: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = '['; m[0x5A] = ']'; m[0x4F] = '!'; m[0xBB] = '|';
        m[0xBA] = 'Ü'; m[0xB0] = 'ä'; m[0xB1] = 'ö'; m[0xB2] = 'ü';
        return m;
    })(),
    IBM1047: (() => {
        const m = createBaseEbcdicMap();
        m[0xAD] = '['; m[0xBD] = ']'; m[0x5F] = '^'; m[0xA1] = '~';
        return m;
    })(),
    IBM273: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = 'ä'; m[0x5A] = 'Ö'; m[0x5B] = '$'; m[0x63] = 'Ä';
        m[0xB0] = 'ü'; m[0xB1] = 'ß'; m[0xBA] = 'Ü'; m[0xBB] = 'ö';
        return m;
    })(),
    IBM277: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = 'Æ'; m[0x5A] = 'Å'; m[0x5B] = '$'; m[0x63] = 'æ';
        m[0xB0] = 'å'; m[0xBA] = 'Ø'; m[0xBB] = 'ø';
        return m;
    })(),
    IBM278: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = 'Ä'; m[0x5A] = 'Å'; m[0x5B] = '¤'; m[0x63] = 'ä';
        m[0xB0] = 'å'; m[0xBA] = 'Ö'; m[0xBB] = 'ö';
        return m;
    })(),
    IBM280: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = 'ò'; m[0x5A] = 'à'; m[0x5B] = '$'; m[0xBA] = 'è'; m[0xBB] = 'é';
        return m;
    })(),
    IBM284: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = 'ñ'; m[0x5A] = 'Ñ'; m[0x5B] = '$'; m[0xBA] = '¿'; m[0xBB] = '¡';
        return m;
    })(),
    IBM285: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = '¢'; m[0x5A] = '!'; m[0x5B] = '£'; m[0xBA] = '['; m[0xBB] = ']';
        return m;
    })(),
    IBM297: (() => {
        const m = createBaseEbcdicMap();
        m[0x4A] = 'à'; m[0x5A] = '°'; m[0x5B] = '$'; m[0xBA] = 'ç'; m[0xBB] = '§';
        return m;
    })(),
    IBM870: (() => {
        const m = createBaseEbcdicMap();
        m[0xAD] = '['; m[0xBD] = ']'; m[0xC0] = '{'; m[0xD0] = '}';
        return m;
    })(),
};

// Generate reverse map (Char -> Byte) for each code page
const REVERSE_MAPS: Record<string, Map<string, number>> = {};

function getReverseMap(codePage: string): Map<string, number> {
    if (!REVERSE_MAPS[codePage]) {
        const rev = new Map<string, number>();
        const forward = EBCDIC_MAPS[codePage] || EBCDIC_MAPS.IBM1047;
        for (let byte = 0; byte < 256; byte++) {
            const char = forward[byte];
            if (char && char !== '?' && !rev.has(char)) {
                rev.set(char, byte);
            }
        }
        REVERSE_MAPS[codePage] = rev;
    }
    return REVERSE_MAPS[codePage];
}

export function hexToBytes(hex: string): Uint8Array {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, '');
    const bytes = new Uint8Array(Math.floor(cleanHex.length / 2));
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(cleanHex.substring(i * 2, i * 2 + 2), 16);
    }
    return bytes;
}

export function bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
}

export function ebcdicToLiteral(hex: string, codePage: SupportedCodePage = 'IBM1047'): string {
    const bytes = hexToBytes(hex);
    if (codePage === 'ASCII') {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    }

    const map = EBCDIC_MAPS[codePage] || EBCDIC_MAPS.IBM1047;
    let result = '';
    for (let i = 0; i < bytes.length; i++) {
        const char = map[bytes[i]];
        if (bytes[i] < 0x40 && bytes[i] !== 0x00 && bytes[i] !== 0x05 && bytes[i] !== 0x0D && bytes[i] !== 0x15 && bytes[i] !== 0x25) {
            result += '.';
        } else {
            result += char || '.';
        }
    }
    return result;
}

export function literalToEbcdic(text: string, codePage: SupportedCodePage = 'IBM1047'): string {
    if (codePage === 'ASCII') {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        return bytesToHex(bytes);
    }

    const rev = getReverseMap(codePage);
    const bytes = new Uint8Array(text.length);

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const byte = rev.get(char);
        if (byte !== undefined) {
            bytes[i] = byte;
        } else {
            bytes[i] = 0x40;
        }
    }
    return bytesToHex(bytes);
}

export function getCodePageTable(codePage: SupportedCodePage = 'IBM1047'): CodePageByteEntry[] {
    const entries: CodePageByteEntry[] = [];
    
    if (codePage === 'ASCII') {
        for (let i = 0; i < 256; i++) {
            const char = String.fromCharCode(i);
            const mnemonic = ASCII_MNEMONICS[i];
            let category: CodePageByteEntry['category'] = 'symbol';
            if (i < 32 || i === 127) category = 'control';
            else if (i === 32) category = 'space';
            else if ((i >= 48 && i <= 57)) category = 'digit';
            else if ((i >= 65 && i <= 90) || (i >= 97 && i <= 122)) category = 'letter';

            entries.push({
                dec: i,
                hex: i.toString(16).padStart(2, '0').toUpperCase(),
                binary: i.toString(2).padStart(8, '0'),
                char: (i < 32 || i === 127) ? (mnemonic || '.') : char,
                mnemonic,
                category
            });
        }
        return entries;
    }

    const map = EBCDIC_MAPS[codePage] || EBCDIC_MAPS.IBM1047;
    for (let i = 0; i < 256; i++) {
        const char = map[i] || '.';
        const mnemonic = EBCDIC_MNEMONICS[i];
        let category: CodePageByteEntry['category'] = 'symbol';
        if (i < 0x40) category = 'control';
        if (i === 0x40) category = 'space';
        else if (/[0-9]/.test(char)) category = 'digit';
        else if (/[a-zA-Z]/.test(char)) category = 'letter';

        entries.push({
            dec: i,
            hex: i.toString(16).padStart(2, '0').toUpperCase(),
            binary: i.toString(2).padStart(8, '0'),
            char: (i < 0x40 && i !== 0x00) ? (mnemonic || '.') : char,
            mnemonic,
            category
        });
    }

    return entries;
}
