# ✨ Shimmer From Structure

A React shimmer/skeleton library that **automatically adapts to your component's runtime structure**. Unlike traditional shimmer libraries that require pre-defined skeleton structures, this library analyzes your actual component's DOM at runtime and generates a shimmer effect that perfectly matches its layout.

## 🎯 Why This Library?

Traditional shimmer libraries require you to:
- Manually create skeleton components that mirror your real components
- Maintain two versions of each component (real + skeleton)
- Update skeletons every time your layout changes

**Shimmer From Structure** eliminates all of that:
- ✅ Automatically measures your component's structure at runtime
- ✅ Generates shimmer effects that match actual dimensions
- ✅ Zero maintenance - works with any layout changes
- ✅ Works with complex nested structures

## 🚀 Installation

```bash
npm install shimmer-from-structure
# or
yarn add shimmer-from-structure
# or
pnpm add shimmer-from-structure
```

## 📖 Basic Usage

```tsx
import { Shimmer } from 'shimmer-from-structure';

function UserProfile({ loading, user }) {
  return (
    <Shimmer loading={loading}>
      <div className="profile">
        <img src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
    </Shimmer>
  );
}
```

That's it! The shimmer will automatically adapt to your component's structure.

## 🎨 API

### `<Shimmer>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `true` | Whether to show shimmer effect or actual content |
| `children` | `React.ReactNode` | required | The content to render/measure |
| `shimmerColor` | `string` | `'#e0e0e0'` | Color of the shimmer wave |
| `backgroundColor` | `string` | `'#f0f0f0'` | Background color of shimmer blocks |
| `duration` | `number` | `1.5` | Animation duration in seconds |
| `borderRadius` | `number` | `4` | Border radius for shimmer blocks (in pixels) |

### Example with Custom Styling

```tsx
<Shimmer
  loading={isLoading}
  shimmerColor="#d0d0ff"
  backgroundColor="#e8e8ff"
  duration={2}
  borderRadius={8}
>
  <YourComponent />
</Shimmer>
```

## 🔧 How It Works

The library solves the dimension measurement challenge through a clever approach:

1. **Hidden Rendering**: When `loading={true}`, it renders your component invisibly off-screen using absolute positioning
2. **DOM Measurement**: Uses `useLayoutEffect` to synchronously measure all elements via `getBoundingClientRect()`
3. **Structure Extraction**: Recursively walks the DOM tree to capture position, size, and element information
4. **Shimmer Generation**: Creates positioned shimmer blocks that match the measured dimensions
5. **Animation**: Applies a smooth gradient animation that sweeps across each block

### Key Technical Decisions

- **`useLayoutEffect` over `useEffect`**: Ensures measurements happen synchronously after DOM updates but before paint, preventing flicker
- **`getBoundingClientRect()`**: Provides precise pixel-perfect dimensions including padding and borders
- **Off-screen rendering**: Positioned at `-9999px` with `visibility: hidden` to measure without showing
- **Absolute positioning**: Shimmer blocks use absolute positioning to perfectly overlay the measured positions

## 🎭 Examples

### Loading a User Card

```tsx
<Shimmer loading={isLoading}>
  <div className="user-card">
    <img src={avatar} className="avatar" />
    <div>
      <h3>{name}</h3>
      <p>{title}</p>
      <p>{location}</p>
    </div>
  </div>
</Shimmer>
```

### Loading an Article

```tsx
<Shimmer loading={isLoading}>
  <article>
    <h1>{article.title}</h1>
    <p className="meta">{article.author} • {article.readTime}</p>
    <p>{article.excerpt}</p>
    <button>Read More</button>
  </article>
</Shimmer>
```

### Loading a Product Grid

```tsx
<div className="product-grid">
  {products.map(product => (
    <Shimmer key={product.id} loading={!product.loaded}>
      <ProductCard product={product} />
    </Shimmer>
  ))}
</div>
```

## 🎯 Best Practices

1. **Use with actual component structure**: Don't create separate skeleton components - wrap your real component
2. **Apply to granular components**: Wrap individual cards/items rather than entire lists for better UX
3. **Maintain consistent sizing**: Ensure your components have stable dimensions for better shimmer accuracy
4. **Avoid highly dynamic layouts**: Works best with components that have predictable structures

## ⚡ Performance Considerations

- The measurement happens only when transitioning to loading state
- Uses `useLayoutEffect` for synchronous measurement (no flicker)
- Minimal re-renders - only updates when loading state or children change
- Lightweight DOM measurements using native browser APIs

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server with example
npm run dev

# Build library
npm run build
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Limitations

- Works best with visible, block-level elements
- May not capture elements with `display: none` or zero dimensions
- Requires components to be renderable in hidden state
- Animation is CSS-based (no fine-grained control over shimmer path)

## 🚧 Roadmap

- [ ] Support for image aspect ratio detection
- [ ] Customizable shimmer direction (vertical, diagonal)
- [ ] Smart grouping of nearby elements
- [ ] React Native support
- [ ] Vue.js adapter
- [ ] Svelte adapter

---

Made with ❤️ for developers tired of maintaining skeleton screens
