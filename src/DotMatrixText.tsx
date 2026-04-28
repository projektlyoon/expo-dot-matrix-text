import { useMemo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { DotMatrixChar } from './DotMatrixChar';
import { GLYPHS } from './glyphs';
import type { DotMatrixGlyph, DotMatrixTextProps } from './types';

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
const FALLBACK_GLYPH = GLYPHS['?'] as DotMatrixGlyph;

function normalizeChar(char: string): string {
  return char.length === 1 ? char.toUpperCase() : char.charAt(0).toUpperCase();
}

function resolveGlyph(
  char: string,
  glyphs: Record<string, DotMatrixGlyph> | undefined,
  fallbackChar: string
): DotMatrixGlyph {
  const normalized = normalizeChar(char);
  const normalizedFallback = normalizeChar(fallbackChar);

  return (
    glyphs?.[char] ??
    glyphs?.[normalized] ??
    GLYPHS[normalized] ??
    glyphs?.[normalizedFallback] ??
    GLYPHS[normalizedFallback] ??
    FALLBACK_GLYPH
  );
}

function getAlignItems(
  align: NonNullable<DotMatrixTextProps['align']>
): ViewStyle['alignItems'] {
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
  accessibilityLabel,
}: DotMatrixTextProps) {
  const lines = useMemo(() => text.split('\n'), [text]);
  const alignItems = useMemo(() => getAlignItems(align), [align]);
  const containerAlignmentStyle = useMemo<ViewStyle>(
    () => ({ alignItems }),
    [alignItems]
  );
  const lineStyles = useMemo(
    () =>
      lines.map(
        (_, lineIndex): StyleProp<ViewStyle> => [
          styles.line,
          {
            flexWrap: wrap ? 'wrap' : 'nowrap',
            marginBottom: lineIndex === lines.length - 1 ? 0 : lineHeight,
          },
        ]
      ),
    [lineHeight, lines, wrap]
  );
  const characterSpacingStyles = useMemo(
    () =>
      lines.map((line) =>
        Array.from(
          line,
          (_, charIndex): ViewStyle => ({
            marginRight: charIndex === line.length - 1 ? 0 : letterSpacing,
          })
        )
      ),
    [letterSpacing, lines]
  );

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? text}
      accessible
      style={[styles.container, containerAlignmentStyle, style]}
      testID={testID}
    >
      {lines.map((line, lineIndex) => (
        <View key={`line-${lineIndex}`} style={lineStyles[lineIndex]}>
          {Array.from(line).map((char, charIndex) => (
            <View
              key={`${lineIndex}-${charIndex}-${char}`}
              style={characterSpacingStyles[lineIndex]?.[charIndex]}
            >
              <DotMatrixChar
                color={color}
                dotGap={dotGap}
                dotSize={dotSize}
                dotStyle={dotStyle}
                glyph={resolveGlyph(char, glyphs, fallbackChar)}
                inactiveColor={inactiveColor}
                inactiveOpacity={inactiveOpacity}
                variant={variant}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  line: {
    flexDirection: 'row',
  },
});
