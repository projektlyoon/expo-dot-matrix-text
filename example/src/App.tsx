import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import {
  DOT_MATRIX_PRESETS,
  DotMatrixText,
  type DotMatrixGlyph,
} from 'expo-dot-matrix-text';

const arcadeGlyph: DotMatrixGlyph = [
  '11111',
  '10101',
  '11111',
  '10101',
  '10101',
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>expo-dot-matrix-text</Text>

      <Section title="Basic usage">
        <DotMatrixText text="HELLO WORLD" dotSize={5} dotGap={1} />
      </Section>

      <Section title="Styling">
        <View style={styles.stack}>
          <DotMatrixText
            color="#f97316"
            inactiveOpacity={0.08}
            text="ORANGE HUD"
            variant="dots"
          />
          <DotMatrixText
            color="#38bdf8"
            inactiveColor="#0f172a"
            text="SQUARE MODE"
            variant="square"
          />
          <DotMatrixText
            color="#f43f5e"
            dotSize={4}
            inactiveOpacity={0.18}
            text="ROUNDED"
            variant="rounded"
          />
        </View>
      </Section>

      <Section title="Sizes">
        <View style={styles.stack}>
          <DotMatrixText text="SMALL" {...DOT_MATRIX_PRESETS.small} />
          <DotMatrixText
            color="#a3e635"
            text="MEDIUM"
            {...DOT_MATRIX_PRESETS.medium}
          />
          <DotMatrixText
            color="#facc15"
            text="LARGE"
            {...DOT_MATRIX_PRESETS.large}
          />
        </View>
      </Section>

      <Section title="Alignment + wrapping">
        <View style={styles.centerBlock}>
          <DotMatrixText
            align="center"
            color="#c084fc"
            dotSize={4}
            lineHeight={12}
            style={styles.centeredText}
            text={'CENTER\nMULTILINE WRAP TEST'}
          />
        </View>
      </Section>

      <Section title="Custom glyphs">
        <DotMatrixText
          color="#22c55e"
          dotSize={5}
          glyphs={{ A: arcadeGlyph }}
          text="ARCADE"
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b1020',
    gap: 24,
    minHeight: '100%',
    padding: 24,
    paddingTop: 64,
  },
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  stack: {
    gap: 14,
  },
  centerBlock: {
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 18,
  },
  centeredText: {
    maxWidth: 240,
  },
});
