import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { DotMatrixCharProps } from './types';

function getBorderRadius(
  variant: DotMatrixCharProps['variant'],
  dotSize: number
) {
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
  dotStyle,
}: DotMatrixCharProps) {
  const cellStyle = useMemo(
    () => ({
      width: dotSize,
      height: dotSize,
      margin: dotGap / 2,
      borderRadius: getBorderRadius(variant, dotSize),
    }),
    [dotGap, dotSize, variant]
  );

  return (
    <View style={styles.char} pointerEvents="none">
      {glyph.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {Array.from(row).map((cell, columnIndex) => {
            const isActive = cell === '1';
            const colorStyle = isActive
              ? styles.active
              : inactiveColor == null
                ? { opacity: inactiveOpacity }
                : styles.active;

            return (
              <View
                key={`${rowIndex}-${columnIndex}`}
                style={[
                  cellStyle,
                  colorStyle,
                  {
                    backgroundColor: isActive
                      ? color
                      : (inactiveColor ?? color),
                  },
                  dotStyle,
                ]}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  char: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  active: {
    opacity: 1,
  },
});

export const DotMatrixChar = memo(DotMatrixCharComponent);
