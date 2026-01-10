# Quick Start Guide

## 🚀 Getting Started with Shimmer From Structure

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Run the Development Server

```bash
npm run dev
```

This will start a Vite dev server and open the example application where you can see the library in action.

### Step 3: Try It Out!

The example includes three different components:
- **User Card** - Simple card with avatar and text
- **Article Preview** - Complex text layout
- **Product Card** - Image + content combination

Click the buttons to toggle between shimmer and actual content to see how the shimmer perfectly adapts to each structure.

## 📦 Building the Library

To build the library for distribution:

```bash
npm run build
```

This creates:
- `dist/index.esm.js` - ES Module format
- `dist/index.umd.js` - UMD format for browser usage
- `dist/index.d.ts` - TypeScript definitions

## 🔧 Using in Your Own Project

### Option 1: Link Locally (for testing)

```bash
# In this project directory
npm link

# In your project directory
npm link shimmer-from-structure
```

### Option 2: Publish to npm

```bash
npm publish
```

Then install in your project:

```bash
npm install shimmer-from-structure
```

## 📝 Next Steps

1. Customize the shimmer appearance using the props
2. Test with your own components
3. Report any issues or suggest improvements
4. Star the repo if you find it useful! ⭐

## 🎯 Key Concept: Runtime Structure Detection

The magic happens here:

```tsx
// ❌ Traditional approach - manual skeleton
<LoadingCard /> // You maintain a separate skeleton

// ✅ Shimmer From Structure - automatic
<Shimmer loading={true}>
  <ActualCard /> // Same component, shimmer generated automatically
</Shimmer>
```

The library:
1. Renders your component invisibly off-screen
2. Measures all element dimensions using `getBoundingClientRect()`
3. Generates shimmer blocks that match those exact dimensions
4. Animates a gradient across them

**No manual skeleton maintenance required!**
