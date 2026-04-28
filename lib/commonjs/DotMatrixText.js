"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotMatrixText = DotMatrixText;
var _react = require("react");
var _reactNative = require("react-native");
var _DotMatrixChar = require("./DotMatrixChar.js");
var _glyphs = require("./glyphs.js");
var _jsxRuntime = require("react/jsx-runtime");
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
const FALLBACK_GLYPH = _glyphs.GLYPHS['?'];
function normalizeChar(char) {
  return char.length === 1 ? char.toUpperCase() : char.charAt(0).toUpperCase();
}
function resolveGlyph(char, glyphs, fallbackChar) {
  const normalized = normalizeChar(char);
  const normalizedFallback = normalizeChar(fallbackChar);
  return glyphs?.[char] ?? glyphs?.[normalized] ?? _glyphs.GLYPHS[normalized] ?? glyphs?.[normalizedFallback] ?? _glyphs.GLYPHS[normalizedFallback] ?? FALLBACK_GLYPH;
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
function DotMatrixText({
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
  const lines = (0, _react.useMemo)(() => text.split('\n'), [text]);
  const alignItems = (0, _react.useMemo)(() => getAlignItems(align), [align]);
  const containerAlignmentStyle = (0, _react.useMemo)(() => ({
    alignItems
  }), [alignItems]);
  const lineStyles = (0, _react.useMemo)(() => lines.map((_, lineIndex) => [styles.line, {
    flexWrap: wrap ? 'wrap' : 'nowrap',
    marginBottom: lineIndex === lines.length - 1 ? 0 : lineHeight
  }]), [lineHeight, lines, wrap]);
  const characterSpacingStyles = (0, _react.useMemo)(() => lines.map(line => Array.from(line, (_, charIndex) => ({
    marginRight: charIndex === line.length - 1 ? 0 : letterSpacing
  }))), [letterSpacing, lines]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    accessibilityLabel: accessibilityLabel ?? text,
    accessible: true,
    style: [styles.container, containerAlignmentStyle, style],
    testID: testID,
    children: lines.map((line, lineIndex) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: lineStyles[lineIndex],
      children: Array.from(line).map((char, charIndex) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: characterSpacingStyles[lineIndex]?.[charIndex],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DotMatrixChar.DotMatrixChar, {
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
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  line: {
    flexDirection: 'row'
  }
});
//# sourceMappingURL=DotMatrixText.js.map