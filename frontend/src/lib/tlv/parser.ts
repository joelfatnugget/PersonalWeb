import { ebcdicToLiteral, literalToEbcdic, hexToBytes, bytesToHex, type SupportedCodePage } from './ebcdic';

export interface TLVNode {
    tag: string;
    length: number;
    lengthHex: string;
    valueHex: string;
    literalValue: string;
    isConstructed: boolean;
    description?: string;
    children?: TLVNode[];
    rawHex: string;
}

export interface ParseOptions {
    encoding?: SupportedCodePage;
    allowPartial?: boolean;
}

// Common EMV / ISO 7816 / ISO 8583 Tag Dictionary
const TAG_DICTIONARY: Record<string, string> = {
    '4F': 'Application Identifier (AID)',
    '50': 'Application Label',
    '57': 'Track 2 Equivalent Data',
    '5A': 'Application Primary Account Number (PAN)',
    '61': 'Application Template',
    '6F': 'FCI Template',
    '70': 'EMV Record Template',
    '71': 'Issuer Script Command Format 1',
    '72': 'Issuer Script Command Format 2',
    '77': 'Response Message Template Format 2',
    '80': 'Response Message Template Format 1',
    '82': 'Application Interchange Profile (AIP)',
    '84': 'Dedicated File (DF) Name',
    '87': 'Application Priority Indicator',
    '88': 'Short File Identifier (SFI)',
    '8A': 'Authorization Response Code (ARC)',
    '8C': 'Card Risk Management Data Object List 1 (CDOL1)',
    '8D': 'Card Risk Management Data Object List 2 (CDOL2)',
    '8E': 'Cardholder Verification Method (CVM) List',
    '8F': 'CA Public Key Index',
    '90': 'Issuer Public Key Certificate',
    '92': 'Issuer Public Key Remainder',
    '93': 'Signed Static Application Data (SAD)',
    '94': 'Application File Locator (AFL)',
    '95': 'Terminal Verification Results (TVR)',
    '98': 'TC Hash Value',
    '99': 'Transaction Personal Identification Number (PIN) Data',
    '9A': 'Transaction Date',
    '9B': 'Transaction Status Information (TSI)',
    '9C': 'Transaction Type',
    '9D': 'DDF Name',
    'A5': 'FCI Proprietary Template',
    'BF0C': 'FCI Issuer Discretionary Data',
    '5F20': 'Cardholder Name',
    '5F24': 'Application Expiration Date',
    '5F25': 'Application Effective Date',
    '5F28': 'Issuer Country Code',
    '5F2A': 'Transaction Currency Code',
    '5F2D': 'Language Preference',
    '5F30': 'Service Code',
    '5F34': 'Application PAN Sequence Number',
    '9F01': 'Acquirer Identifier',
    '9F02': 'Amount, Authorized (Numeric)',
    '9F03': 'Amount, Other (Numeric)',
    '9F06': 'Application Identifier (AID) - Terminal',
    '9F07': 'Application Usage Control (AUC)',
    '9F08': 'Application Version Number (Card)',
    '9F09': 'Application Version Number (Terminal)',
    '9F0D': 'Issuer Action Code - Default',
    '9F0E': 'Issuer Action Code - Denial',
    '9F0F': 'Issuer Action Code - Online',
    '9F10': 'Issuer Application Data (IAD)',
    '9F11': 'Issuer Code Table Index',
    '9F12': 'Application Preferred Name',
    '9F1A': 'Terminal Country Code',
    '9F1E': 'Interface Device (IFD) Serial Number',
    '9F26': 'Application Cryptogram (AC)',
    '9F27': 'Cryptogram Information Data (CID)',
    '9F33': 'Terminal Capabilities',
    '9F34': 'Cardholder Verification Method (CVM) Results',
    '9F35': 'Terminal Type',
    '9F36': 'Application Transaction Counter (ATC)',
    '9F37': 'Unpredictable Number',
    '9F40': 'Additional Terminal Capabilities',
    '9F66': 'Terminal Transaction Qualifiers (TTQ)',
    '9F6C': 'Card Transaction Qualifiers (CTQ)',
};

export function lookupTagDescription(tag: string): string {
    const uppercaseTag = tag.toUpperCase();
    return TAG_DICTIONARY[uppercaseTag] || `Tag 0x${uppercaseTag}`;
}

export function parseTLV(hexInput: string, options: ParseOptions = {}): TLVNode[] {
    const encoding = options.encoding || 'IBM1047';
    const cleanHex = hexInput.replace(/[^0-9a-fA-F]/g, '');
    const bytes = hexToBytes(cleanHex);
    const nodes: TLVNode[] = [];

    let offset = 0;
    while (offset < bytes.length) {
        // Ignore padding bytes (0x00 or 0xFF)
        if (bytes[offset] === 0x00 || bytes[offset] === 0xFF) {
            offset++;
            continue;
        }

        const tagStart = offset;
        const b1 = bytes[offset++];
        let tagHex = b1.toString(16).padStart(2, '0').toUpperCase();

        // Check bit 6 (0x20) for constructed tag
        const isConstructed = (b1 & 0x20) === 0x20;

        // Check if multi-byte tag (lower 5 bits are all set to 1 => 0x1F)
        if ((b1 & 0x1F) === 0x1F) {
            while (offset < bytes.length) {
                const nextByte = bytes[offset++];
                tagHex += nextByte.toString(16).padStart(2, '0').toUpperCase();
                // Bit 8 (0x80) indicates another tag byte follows
                if ((nextByte & 0x80) === 0) {
                    break;
                }
            }
        }

        if (offset >= bytes.length) break;

        // Parse length
        const lenStart = offset;
        const l1 = bytes[offset++];
        let length = 0;
        let numLenBytes = 1;

        if ((l1 & 0x80) === 0) {
            // Short form length (0 to 127)
            length = l1;
        } else {
            // Long form length
            numLenBytes = l1 & 0x7F;
            if (numLenBytes === 0 || offset + numLenBytes > bytes.length) {
                // Invalid or indefinite length
                break;
            }
            length = 0;
            for (let k = 0; k < numLenBytes; k++) {
                length = (length << 8) | bytes[offset++];
            }
        }

        const lengthHex = bytesToHex(bytes.slice(lenStart, offset));

        // Parse value
        if (offset + length > bytes.length) {
            if (!options.allowPartial) {
                break;
            }
            length = bytes.length - offset;
        }

        const valueBytes = bytes.slice(offset, offset + length);
        const valueHex = bytesToHex(valueBytes);
        offset += length;

        const rawHex = bytesToHex(bytes.slice(tagStart, offset));
        const literalValue = ebcdicToLiteral(valueHex, encoding);
        const description = lookupTagDescription(tagHex);

        let children: TLVNode[] | undefined = undefined;
        if (isConstructed && valueHex.length > 0) {
            try {
                const parsedChildren = parseTLV(valueHex, options);
                if (parsedChildren.length > 0) {
                    children = parsedChildren;
                }
            } catch {
                // Fallback to flat node if nested parse fails
            }
        }

        nodes.push({
            tag: tagHex,
            length,
            lengthHex,
            valueHex,
            literalValue,
            isConstructed,
            description,
            children,
            rawHex
        });
    }

    return nodes;
}

export function encodeTLV(tag: string, literalValue: string, encoding: SupportedCodePage = 'IBM1047'): string {
    const cleanTag = tag.replace(/[^0-9a-fA-F]/g, '').toUpperCase();
    const valueHex = literalToEbcdic(literalValue, encoding);
    const valueBytes = hexToBytes(valueHex);
    const length = valueBytes.length;

    let lengthHex = '';
    if (length <= 127) {
        lengthHex = length.toString(16).padStart(2, '0').toUpperCase();
    } else if (length <= 255) {
        lengthHex = '81' + length.toString(16).padStart(2, '0').toUpperCase();
    } else if (length <= 65535) {
        lengthHex = '82' + length.toString(16).padStart(4, '0').toUpperCase();
    } else {
        lengthHex = '83' + length.toString(16).padStart(6, '0').toUpperCase();
    }

    return `${cleanTag}${lengthHex}${valueHex}`;
}
