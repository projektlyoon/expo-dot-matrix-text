# expo-dot-matrix-text

A lightweight Expo-compatible React Native component library for rendering customizable 5x5 dot-matrix text using pure View-based glyphs.

## Installation


```sh
npm install expo-dot-matrix-text
```


## Usage


```tsx
import { DotMatrixText } from 'expo-dot-matrix-text';

// ...

<DotMatrixText text="HELLO WORLD" />;
<DotMatrixText color="#f97316" dotSize={4} text="PLAYER 1" variant="dots" />;
```

## API

```tsx
import {
  DotMatrixChar,
  DotMatrixText,
  DOT_MATRIX_PRESETS,
  GLYPHS,
  getGlyph,
  registerGlyphs,
} from 'expo-dot-matrix-text';
```

`DotMatrixText` is the primary API. It renders 5x5 glyphs with pure React Native
`View` components and supports colors, inactive dots, sizing, spacing, wrapping,
alignment, variants, and custom glyph overrides.

```tsx
<DotMatrixText
  align="center"
  color="#10b981"
  dotSize={4}
  letterSpacing={5}
  text={'READY\nPLAYER ONE'}
/>
```

Custom glyphs can be registered globally or passed per component:

```tsx
registerGlyphs({
  A: ['11111', '10001', '11111', '10001', '10001'],
});
```

This library has no native code, Skia, Reanimated, or Expo-specific API usage.


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
