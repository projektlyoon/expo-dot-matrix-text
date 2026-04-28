"use strict";

import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { DotMatrixChar } from "./DotMatrixChar.js";
import { GLYPHS } from "./glyphs.js";
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_COLOR = '#10b981';
const DEFAULT_INACTIVE_OPACITY = 0.13;
const DEFAULT_DOT_SIZE = 2;
const DEFAULT_DOT_GAP = 1;
const DEFAULT_LETTER_SPACING = 4;
const DEFAULT_LINE_HEIGHT = 6;
const DEFAULT_ALIGN = 'left';
const DEFAULT_WRAP = true;
const DEFAULT_VARIANT = 'rounded';
const DEFAULT_FALLBACK_CHAR = '?';
const FALLBACK_GLYPH = GLYPHS['?'];
function normalizeChar(char) {
  return char.length === 1 ? char.toUpperCase() : char.charAt(0).toUpperCase();
}
function resolveGlyph(char, glyphs, fallbackChar) {
  const normalized = normalizeChar(char);
  const normalizedFallback = normalizeChar(fallbackChar);
  return glyphs?.[char] ?? glyphs?.[normalized] ?? GLYPHS[normalized] ?? glyphs?.[normalizedFallback] ?? GLYPHS[normalizedFallback] ?? FALLBACK_GLYPH;
}
function getAlignItems(align) {
  if (align === 'center') {
    return 'center';
  }
  if (align === 'right') {
    return 'flex-end';
  }
  return 'flex-start';
}
export function DotMatrixText({
  text,
  color = DEFAULT_COLOR,
  inactiveColor,
  inactiveOpacity = DEFAULT_INACTIVE_OPACITY,
  dotSize = DEFAULT_DOT_SIZE,
  dotGap = DEFAULT_DOT_GAP,
  letterSpacing = DEFAULT_LETTER_SPACING,
  lineHeight = DEFAULT_LINE_HEIGHT,
  align = DEFAULT_ALIGN,
  wrap = DEFAULT_WRAP,
  variant = DEFAULT_VARIANT,
  dotStyle,
  style,
  glyphs,
  fallbackChar = DEFAULT_FALLBACK_CHAR,
  testID,
  accessibilityLabel
}) {
  const lines = useMemo(() => text.split('\n'), [text]);
  const alignItems = useMemo(() => getAlignItems(align), [align]);
  const containerAlignmentStyle = useMemo(() => ({
    alignItems
  }), [alignItems]);
  const lineStyles = useMemo(() => lines.map((_, lineIndex) => [styles.line, {
    flexWrap: wrap ? 'wrap' : 'nowrap',
    marginBottom: lineIndex === lines.length - 1 ? 0 : lineHeight
  }]), [lineHeight, lines, wrap]);
  const characterSpacingStyles = useMemo(() => lines.map(line => Array.from(line, (_, charIndex) => ({
    marginRight: charIndex === line.length - 1 ? 0 : letterSpacing
  }))), [letterSpacing, lines]);
  return /*#__PURE__*/_jsx(View, {
    accessibilityLabel: accessibilityLabel ?? text,
    accessible: true,
    style: [styles.container, containerAlignmentStyle, style],
    testID: testID,
    children: lines.map((line, lineIndex) => /*#__PURE__*/_jsx(View, {
      style: lineStyles[lineIndex],
      children: Array.from(line).map((char, charIndex) => /*#__PURE__*/_jsx(View, {
        style: characterSpacingStyles[lineIndex]?.[charIndex],
        children: /*#__PURE__*/_jsx(DotMatrixChar, {
          color: color,
          dotGap: dotGap,
          dotSize: dotSize,
          dotStyle: dotStyle,
          glyph: resolveGlyph(char, glyphs, fallbackChar),
          inactiveColor: inactiveColor,
          inactiveOpacity: inactiveOpacity,
          variant: variant
        })
      }, `${lineIndex}-${charIndex}-${char}`))
    }, `line-${lineIndex}`))
  });
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  line: {
    flexDirection: 'row'
  }
});
//# sourceMappingURL=DotMatrixText.js.map