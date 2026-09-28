import { describe, it, expect } from 'vitest';
import { parseTLV, encodeTLV, lookupTagDescription, type TLVNode } from './parser';

describe('TLV Parser & Encoder', () => {
    it('parses single BER-TLV data correctly', () => {
        // Tag 9F02 (Amount Authorized), Length 06, Value 000000001000 (10.00)
        const hex = '9F0206000000001000';
        const nodes = parseTLV(hex, { encoding: 'IBM037' });
        
        expect(nodes).toHaveLength(1);
        expect(nodes[0].tag).toBe('9F02');
        expect(nodes[0].length).toBe(6);
        expect(nodes[0].valueHex.toUpperCase()).toBe('000000001000');
    });

    it('parses multiple concatenated TLVs correctly', () => {
        // Tag 9F02 (6 bytes) + Tag 5F2A (2 bytes: 0840 - USD)
        const hex = '9F02060000000010005F2A020840';
        const nodes = parseTLV(hex, { encoding: 'IBM037' });

        expect(nodes).toHaveLength(2);
        expect(nodes[0].tag).toBe('9F02');
        expect(nodes[1].tag).toBe('5F2A');
        expect(nodes[1].length).toBe(2);
        expect(nodes[1].valueHex.toUpperCase()).toBe('0840');
    });

    it('parses nested / constructed TLV nodes recursively', () => {
        // Tag 61 (Constructed Application Template), Length 0A (10)
        // Sub-tags: 4F (05, A000000003), 50 (01, 41 - 'A' in ASCII or EBCDIC)
        const hex = '610AA000000003500141';
        // Note: 61 has inner length 0A -> inner content is A000000003 (wait: 4F03A000000003?)
        // Let's create proper constructed hex:
        // Tag 6F (FCI Template), len 0D (13 bytes):
        //   Tag 84 (DF Name) len 07: A0000000031010
        //   Tag A5 (FCI Proprietary) len 02: 8800
        const constructedHex = '6F0D8407A0000000031010A5028800';
        const nodes = parseTLV(constructedHex, { encoding: 'IBM037' });

        expect(nodes).toHaveLength(1);
        expect(nodes[0].tag).toBe('6F');
        expect(nodes[0].isConstructed).toBe(true);
        expect(nodes[0].children).toBeDefined();
        expect(nodes[0].children?.length).toBe(2);
        expect(nodes[0].children![0].tag).toBe('84');
        expect(nodes[0].children![1].tag).toBe('A5');
    });

    it('translates value to raw literal using selected IBM character set', () => {
        // Tag 50 (Application Label), Length 0B (11), Value in EBCDIC IBM037: "VISA CREDIT"
        // EBCDIC: V=E5, I=C9, S=E2, A=C1, space=40, C=C3, R=D9, E=C5, D=C4, I=C9, T=E3
        const valueEbcdic = 'E5C9E2C140C3D9C5D4C9E3'; // "VISA CREDIT" (with M for C5D4C9E3)
        // Let's check "HELLO": C8C5D3D3D6
        const tagHex = '5005C8C5D3D3D6';
        const nodes = parseTLV(tagHex, { encoding: 'IBM037' });

        expect(nodes[0].tag).toBe('50');
        expect(nodes[0].literalValue).toBe('HELLO');
    });

    it('encodes TLV node from Tag, Raw Literal, and IBM Character Set', () => {
        const tag = '50';
        const literal = 'HELLO';
        const encodedHex = encodeTLV(tag, literal, 'IBM037');

        // Tag: 50, Len: 05, Value: C8C5D3D3D6
        expect(encodedHex.toUpperCase()).toBe('5005C8C5D3D3D6');
    });

    it('looks up standard EMV / ISO tag definitions', () => {
        const desc1 = lookupTagDescription('9F02');
        expect(desc1).toBe('Amount, Authorized (Numeric)');

        const desc2 = lookupTagDescription('50');
        expect(desc2).toBe('Application Label');
    });

    it('handles multi-byte length parsing (e.g. 0x81 0x80 for 128 bytes)', () => {
        // Tag 84, length 81 80 (128 bytes of 00)
        const hex = '848180' + '00'.repeat(128);
        const nodes = parseTLV(hex, { encoding: 'IBM037' });

        expect(nodes).toHaveLength(1);
        expect(nodes[0].length).toBe(128);
        expect(nodes[0].valueHex.length).toBe(256); // 128 bytes = 256 hex chars
    });

    it('parses TLV with IBM943 encoding and decodes Japanese literal values', () => {
        const hex = '500682B182F182C9';
        const nodes = parseTLV(hex, { encoding: 'IBM943' });

        expect(nodes).toHaveLength(1);
        expect(nodes[0].tag).toBe('50');
        expect(nodes[0].length).toBe(6);
        expect(nodes[0].literalValue).toBe('こんに');
    });

    it('parses valid nested EMV FCI template payload with accurate length bytes into a single root tag without orphans', () => {
        // Sample payload:
        // Tag 6F (FCI Template, length 0x21 = 33 bytes)
        //   Tag 84 (DF Name), length 0x07 = 7 bytes, Value A0000000031010
        //   Tag A5 (FCI Proprietary Template, length 0x16 = 22 bytes)
        //     Tag 50 (App Label), length 0x0B = 11 bytes, Value C8C5D3D3D640E6D6D9D3C4 ("HELLO WORLD")
        //     Tag 9F02 (Amount Auth), length 0x06 = 6 bytes, Value 000000001000
        // Total byte count: 1 + 1 + 33 = 35 bytes (70 hex chars)
        const hex = '6F218407A0000000031010A516500BC8C5D3D3D640E6D6D9D3C49F0206000000001000';
        const nodes = parseTLV(hex, { encoding: 'IBM037' });

        // Must parse strictly into 1 root node with 0 orphan trailing tags
        expect(nodes).toHaveLength(1);
        const root = nodes[0];
        expect(root.tag).toBe('6F');
        expect(root.length).toBe(33);
        expect(root.isConstructed).toBe(true);
        expect(root.children).toHaveLength(2);

        // Child 1: Tag 84
        const tag84 = root.children![0];
        expect(tag84.tag).toBe('84');
        expect(tag84.length).toBe(7);
        expect(tag84.valueHex.toUpperCase()).toBe('A0000000031010');

        // Child 2: Tag A5 (Constructed)
        const tagA5 = root.children![1];
        expect(tagA5.tag).toBe('A5');
        expect(tagA5.length).toBe(22);
        expect(tagA5.isConstructed).toBe(true);
        expect(tagA5.children).toHaveLength(2);

        // Nested child 2.1: Tag 50
        const tag50 = tagA5.children![0];
        expect(tag50.tag).toBe('50');
        expect(tag50.length).toBe(11);
        expect(tag50.literalValue).toBe('HELLO WORLD');

        // Nested child 2.2: Tag 9F02
        const tag9F02 = tagA5.children![1];
        expect(tag9F02.tag).toBe('9F02');
        expect(tag9F02.length).toBe(6);
        expect(tag9F02.valueHex.toUpperCase()).toBe('000000001000');
    });
});

