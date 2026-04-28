import type { StyleProp, ViewStyle } from 'react-native';
export type DotMatrixGlyph = string[];
export type DotMatrixVariant = 'dots' | 'square' | 'rounded';
export type DotMatrixPreset = {
    dotSize: number;
    dotGap: number;
};
export type DotMatrixCharProps = {
    glyph: DotMatrixGlyph;
    color: string;
    inactiveColor?: string;
    inactiveOpacity: number;
    dotSize: number;
    dotGap: number;
    variant: DotMatrixVariant;
    dotStyle?: StyleProp<ViewStyle>;
};
export type DotMatrixTextProps = {
    text: string;
    color?: string;
    inactiveColor?: string;
    inactiveOpacity?: number;
    dotSize?: number;
    dotGap?: number;
    letterSpacing?: number;
    lineHeight?: number;
    align?: 'left' | 'center' | 'right';
    wrap?: boolean;
    variant?: DotMatrixVariant;
    dotStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    glyphs?: Record<string, DotMatrixGlyph>;
    fallbackChar?: string;
    testID?: string;
    accessibilityLabel?: string;
};
//# sourceMappingURL=types.d.ts.map