"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotMatrixChar = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
function getBorderRadius(variant, dotSize) {
  if (variant === 'square') {
    return 0;
  }
  if (variant === 'rounded') {
    return dotSize * 0.3;
  }
  return dotSize / 2;
}
function DotMatrixCharComponent({
  glyph,
  color,
  inactiveColor,
  inactiveOpacity,
  dotSize,
  dotGap,
  variant,
  dotStyle
}) {
  const cellStyle = (0, _react.useMemo)(() => ({
    width: dotSize,
    height: dotSize,
    margin: dotGap / 2,
    borderRadius: getBorderRadius(variant, dotSize)
  }), [dotGap, dotSize, variant]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.char,
    pointerEvents: "none",
    children: glyph.map((row, rowIndex) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.row,
      children: Array.from(row).map((cell, columnIndex) => {
        const isActive = cell === '1';
        const colorStyle = isActive ? styles.active : inactiveColor == null ? {
          opacity: inactiveOpacity
        } : styles.active;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [cellStyle, colorStyle, {
            backgroundColor: isActive ? color : inactiveColor ?? color
          }, dotStyle]
        }, `${rowIndex}-${columnIndex}`);
      })
    }, `row-${rowIndex}`))
  });
}
const styles = _reactNative.StyleSheet.create({
  char: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  active: {
    opacity: 1
  }
});
const DotMatrixChar = exports.DotMatrixChar = /*#__PURE__*/(0, _react.memo)(DotMatrixCharComponent);
//# sourceMappingURL=DotMatrixChar.js.map