"use strict";

import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { jsx as _jsx } from "react/jsx-runtime";
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
  const cellStyle = useMemo(() => ({
    width: dotSize,
    height: dotSize,
    margin: dotGap / 2,
    borderRadius: getBorderRadius(variant, dotSize)
  }), [dotGap, dotSize, variant]);
  return /*#__PURE__*/_jsx(View, {
    style: styles.char,
    pointerEvents: "none",
    children: glyph.map((row, rowIndex) => /*#__PURE__*/_jsx(View, {
      style: styles.row,
      children: Array.from(row).map((cell, columnIndex) => {
        const isActive = cell === '1';
        const colorStyle = isActive ? styles.active : inactiveColor == null ? {
          opacity: inactiveOpacity
        } : styles.active;
        return /*#__PURE__*/_jsx(View, {
          style: [cellStyle, colorStyle, {
            backgroundColor: isActive ? color : inactiveColor ?? color
          }, dotStyle]
        }, `${rowIndex}-${columnIndex}`);
      })
    }, `row-${rowIndex}`))
  });
}
const styles = StyleSheet.create({
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
export const DotMatrixChar = /*#__PURE__*/memo(DotMatrixCharComponent);
//# sourceMappingURL=DotMatrixChar.js.map