import { describe, expect, it } from '@jest/globals';

import { getGlyph, registerGlyphs } from '../glyphs';

describe('glyph resolution', () => {
  it('normalizes lowercase characters', () => {
    expect(getGlyph('a')).toEqual(getGlyph('A'));
  });

  it('falls back to question mark for unknown characters', () => {
    expect(getGlyph('~')).toEqual(getGlyph('?'));
  });

  it('registers custom glyphs', () => {
    const glyph = ['11111', '10001', '11111', '10001', '10001'] as const;

    registerGlyphs({ '~': [...glyph] });

    expect(getGlyph('~')).toEqual(glyph);
  });
});
