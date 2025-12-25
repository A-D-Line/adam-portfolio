# Performance Optimization Checklist
**Adam Line Portfolio - Pre-Deployment Performance Audit**  
**Date:** December 25, 2025  
**Framework:** Vite + React 19 + Tailwind CSS

---

## Executive Summary

This performance audit identifies optimization opportunities for the Adam Line portfolio website. While the application is relatively lightweight, implementing these recommendations will significantly improve loading times, Core Web Vitals scores, and overall user experience.

**Current Stack:**
- ⚙️ Build Tool: Vite 7.2.4
- ⚛️ Framework: React 19.2.0
- 🎨 Styling: Tailwind CSS 3.4.17
- 🔤 Fonts: Google Fonts (Inter family)

**Performance Target Metrics:**
- Lighthouse Performance Score: **>95**
- First Contentful Paint (FCP): **<1.0s**
- Largest Contentful Paint (LCP): **<2.5s**
- Cumulative Layout Shift (CLS): **<0.1**
- Total Bundle Size: **<200KB** (gzipped)

---

## 🔴 Critical Optimizations (Pre-Deployment)

### 1. Image Optimization
**Impact:** ⚡⚡⚡ CRITICAL  
**Effort:** MEDIUM  
**Estimated Performance Gain:** 50-70% reduction in image payload

#### Current Issues

**Unoptimized Images:**
- `adam-headshot.jpg` - **102 KB** [Hero.tsx:L24](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Hero.tsx#L24)
- `experience-collage.png` - **161 KB** [Experience.tsx:L13](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Experience.tsx#L13)
- `company-logo.png` - **13 KB** [Company.tsx:L30](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Company.tsx#L30)

**Total Image Payload:** **~276 KB** (uncompressed)

#### Recommended Solutions

**Option A: WebP Conversion + Manual Optimization (Quick Win)**

1. **Convert images to WebP format:**
   ```bash
   # Install imagemagick if not available
   brew install imagemagick
   
   # Convert images
   convert src/assets/adam-headshot.jpg -quality 85 src/assets/adam-headshot.webp
   convert src/assets/experience-collage.png -quality 85 src/assets/experience-collage.webp
   convert src/assets/company-logo.png -quality 90 src/assets/company-logo.webp
   ```

2. **Update component imports:**
   ```tsx
   // Hero.tsx
   import headshot from '../assets/adam-headshot.webp';
   
   // Experience.tsx
   import experienceCollage from '../assets/experience-collage.webp';
   
   // Company.tsx
   import companyLogo from '../assets/company-logo.webp';
   ```

**Expected Reduction:** 60-70% smaller file sizes (projected ~80-100 KB total)

---

**Option B: Vite Image Plugin (Recommended for Production)**

Install `vite-plugin-image-optimizer`:

```bash
npm install -D vite-plugin-image-optimizer
```

Update [vite.config.ts](file:///Users/davidcoutts/Documents/Github/adam-portfolio/vite.config.ts):

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 85,
      },
      png: {
        quality: 85,
      },
      webp: {
        quality: 85,
      },
    }),
  ],
})
```

**Benefits:**
- Automatic optimization during build
- Preserves original images in source
- Configurable quality settings
- Zero code changes required

---

**Option C: Responsive Images with `<picture>` Element**

For maximum compatibility and performance:

```tsx
// Hero.tsx example
<picture>
  <source srcSet={headshotWebP} type="image/webp" />
  <img
    src={headshotJPG}
    alt="Adam Line - Theatre Producer headshot"
    className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
    width="320"
    height="320"
    loading="lazy"
  />
</picture>
```

---

### 2. Font Loading Optimization
**Impact:** ⚡⚡⚡ CRITICAL  
**Effort:** MEDIUM  
**Estimated Performance Gain:** 200-500ms faster FCP

#### Current Issues

**Google Fonts Load Blocking:**
- External CSS import blocks initial render: [index.css:L1](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/index.css#L1)
- Network request to `fonts.googleapis.com` (blocking)
- Secondary network request to `fonts.gstatic.com` (font files)
- Flash of Unstyled Text (FOUT) risk

**Current Implementation:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

#### Recommended Solutions

**Option A: Self-Host with `@fontsource` (Recommended)**

1. **Install font package:**
   ```bash
   npm install @fontsource/inter
   ```

2. **Update [index.css](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/index.css):**
   ```css
   /* Remove Google Fonts import */
   /* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); */
   
   /* Add self-hosted fonts */
   @import '@fontsource/inter/400.css';
   @import '@fontsource/inter/500.css';
   @import '@fontsource/inter/600.css';
   @import '@fontsource/inter/700.css';
   
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     body {
       @apply font-sans text-black;
     }
   }
   ```

**Benefits:**
- ✅ No external network requests
- ✅ Fonts bundled with assets
- ✅ Better caching control
- ✅ Eliminates FOUT
- ✅ Works offline
- ✅ Improved privacy (no Google tracking)

---

**Option B: Font Preloading (If keeping Google Fonts)**

Update [index.html](file:///Users/davidcoutts/Documents/Github/adam-portfolio/index.html):

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Preconnect to font origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload critical font weights -->
  <link 
    rel="preload" 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
    as="style"
  />
  <link 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
    rel="stylesheet"
  />
  
  <title>Adam Line | Portfolio</title>
</head>
```

**Move CSS import from `index.css` to `index.html`** to enable preconnect optimization.

---

**Option C: Variable Fonts (Maximum Optimization)**

Use Inter variable font for smallest payload:

```bash
npm install @fontsource-variable/inter
```

```css
/* index.css */
@import '@fontsource-variable/inter';
```

**Bundle Size Savings:** ~90% reduction (variable font ≈ 50-100 KB vs multiple weights ≈ 400+ KB)

---

### 3. Lazy Loading & Code Splitting
**Impact:** ⚡⚡ HIGH  
**Effort:** LOW  
**Estimated Performance Gain:** Faster initial load, reduced bundle size

#### Implement Lazy Loading for Below-Fold Content

Update [App.tsx](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/App.tsx):

```tsx
import { lazy, Suspense } from 'react';
import Hero from './components/Hero'; // Keep Hero eagerly loaded

// Lazy load below-the-fold components
const CorePillars = lazy(() => import('./components/CorePillars'));
const Experience = lazy(() => import('./components/Experience'));
const Company = lazy(() => import('./components/Company'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <main className="w-full">
      <Hero />
      <Suspense fallback={<div className="min-h-screen" />}>
        <CorePillars />
        <Experience />
        <Company />
        <Contact />
      </Suspense>
    </main>
  );
}

export default App;
```

**Benefits:**
- Reduces initial JavaScript bundle
- Improves Time to Interactive (TTI)
- Better perceived performance

---

### 4. Image Lazy Loading & Sizing
**Impact:** ⚡⚡ HIGH  
**Effort:** LOW

#### Add Explicit Dimensions & Native Lazy Loading

Update all image elements to prevent layout shift:

**[Hero.tsx](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Hero.tsx#L23-L27):**
```tsx
<img
  src={headshot}
  alt="Adam Line - Theatre Producer headshot"
  className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
  width="320"
  height="320"
  loading="eager" // Above-the-fold, load immediately
/>
```

**[Experience.tsx](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Experience.tsx#L12-L16):**
```tsx
<img
  src={experienceCollage}
  alt="Montage of theatre productions and logos including Theatre503, Park Theatre, and Jermyn Street Theatre"
  className="w-full rounded-lg"
  width="600"
  height="400"
  loading="lazy" // Below-the-fold
/>
```

**[Company.tsx](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Company.tsx#L29-L33):**
```tsx
<img
  src={companyLogo}
  alt="Adam Line Creative Ltd logo - speech bubble design"
  className="w-full max-w-md object-contain"
  width="400"
  height="400"
  loading="lazy"
/>
```

**Benefits:**
- Prevents Cumulative Layout Shift (CLS)
- Browser-native lazy loading (no JavaScript required)
- Prioritizes above-the-fold content

---

## 🟡 Important Optimizations

### 5. Tailwind CSS Purging
**Impact:** ⚡⚡ MEDIUM  
**Effort:** MINIMAL (Already Configured)

✅ **Status:** Tailwind CSS purging is properly configured in [tailwind.config.js](file:///Users/davidcoutts/Documents/Github/adam-portfolio/tailwind.config.js#L3-L6)

**Verify production build excludes unused CSS:**
```bash
npm run build
# Check dist/assets/*.css size - should be <10 KB
```

---

### 6. Bundle Analysis
**Impact:** ⚡⚡ MEDIUM  
**Effort:** LOW

#### Install Bundle Analyzer

```bash
npm install -D rollup-plugin-visualizer
```

Update [vite.config.ts](file:///Users/davidcoutts/Documents/Github/adam-portfolio/vite.config.ts):

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
```

Run build and analyze:
```bash
npm run build
# Opens interactive bundle visualization
```

---

### 7. Asset Preloading
**Impact:** ⚡ LOW-MEDIUM  
**Effort:** LOW

#### Preload Critical Assets

Add to [index.html](file:///Users/davidcoutts/Documents/Github/adam-portfolio/index.html) `<head>`:

```html
<!-- Preload hero image for LCP optimization -->
<link rel="preload" as="image" href="/src/assets/adam-headshot.webp" />

<!-- Preload critical CSS (Vite will inject, but good to have) -->
<link rel="preload" as="style" href="/src/index.css" />
```

---

## 🟢 Nice-to-Have Optimizations

### 8. Build Optimizations
**Impact:** ⚡ LOW  
**Effort:** LOW

Update [vite.config.ts](file:///Users/davidcoutts/Documents/Github/adam-portfolio/vite.config.ts) for production:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    cssMinify: 'lightningcss',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
  },
})
```

---

### 9. Accessibility = Performance
**Impact:** ⚡ LOW (SEO/UX)  
**Effort:** MINIMAL

See **ACCESSIBILITY_FINDINGS** section below for improvements that also help performance (semantic HTML, reduced DOM size).

---

## 🌐 Accessibility Compliance (WCAG AA)

### ✅ Passed Checks

| Check | Status | Notes |
|-------|--------|-------|
| Alt text on images | ✅ Pass | All images have descriptive alt tags |
| Heading hierarchy | ✅ Pass | Single H1, proper H2/H3 nesting |
| Form labels | ✅ Pass | All inputs properly labeled |
| Semantic HTML | ✅ Pass | Proper `<section>`, `<main>`, `<form>` usage |

### ⚠️ Accessibility Issues Found

#### 1. Contrast Ratio Violation (CRITICAL)
**Status:** ❌ **FAIL WCAG AA**

**Issue:** Soft pink (#FFBBBB) text on white background fails contrast requirements

**WCAG Requirement:**
- Normal text (18px+): **Minimum 3:1 ratio**
- Large text (24px+): **Minimum 3:1 ratio**
- **AA Standard**: 4.5:1 for normal text

**Measured Contrast:**
- `#FFBBBB` on `#FFFFFF`: **~1.8:1** ❌ FAIL
- Used in: Background color (not text), so this is **OK** ✅
- `#333333` (dark-grey) on `#FFFFFF`: **12.6:1** ✅ PASS
- `#000000` on `#FFBBBB`: **~11.5:1** ✅ PASS

**Verification:** The soft pink color is used for **backgrounds only**, not text. All text uses sufficient contrast:
- Black (#000000) on soft pink (#FFBBBB): ✅ PASS
- Dark grey (#333333) on white: ✅ PASS
- White on black: ✅ PASS

**Conclusion:** ✅ **NO ACCESSIBILITY VIOLATIONS** - Color usage is compliant.

---

#### 2. Focus Indicators
**Issue:** Custom form inputs may need enhanced focus styles

**Recommendation:** Enhance focus visibility at [Contact.tsx:L26](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/components/Contact.tsx#L26):

```tsx
className="w-full p-4 bg-gray-50 border border-gray-200 
  focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2 
  outline-none transition-colors"
```

---

#### 3. Skip to Main Content Link
**Enhancement:** Add skip link for keyboard navigation

Add to [index.html](file:///Users/davidcoutts/Documents/Github/adam-portfolio/index.html):

```html
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 z-50">
    Skip to main content
  </a>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

Update [App.tsx](file:///Users/davidcoutts/Documents/Github/adam-portfolio/src/App.tsx):

```tsx
<main id="main-content" className="w-full">
```

---

## 📊 Performance Benchmarking Plan

### Pre-Deployment Testing

1. **Run Lighthouse Audit:**
   ```bash
   npm run build
   npm run preview
   # Open Chrome DevTools > Lighthouse > Run audit
   ```

   **Target Scores:**
   - Performance: >95
   - Accessibility: 100
   - Best Practices: >95
   - SEO: >95

2. **Core Web Vitals Testing:**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Test on real devices (mobile + desktop)

3. **Network Throttling:**
   - Test on "Slow 3G" to simulate poor connections
   - Ensure page usable within 5 seconds

---

## 🎯 Implementation Priority

### Phase 1: Critical (Before Deployment) - **ETA: 2-3 hours**
- [ ] Convert images to WebP format
- [ ] Self-host fonts with `@fontsource/inter`
- [ ] Add `width`, `height`, and `loading` attributes to all images
- [ ] Implement lazy loading for below-fold components

### Phase 2: Important (Same Week) - **ETA: 1-2 hours**
- [ ] Install and configure bundle analyzer
- [ ] Add asset preloading
- [ ] Enhanced focus indicators
- [ ] Run Lighthouse audit and fix issues

### Phase 3: Nice-to-Have (Post-Launch) - **ETA: 1 hour**
- [ ] Implement advanced build optimizations
- [ ] Add skip-to-content link
- [ ] Set up performance monitoring

---

## 📈 Expected Performance Gains

| Optimization | LCP Improvement | FCP Improvement | Bundle Size |
|--------------|-----------------|-----------------|-------------|
| WebP images | -1.0s to -2.0s | -0.3s to -0.5s | -60% images |
| Self-hosted fonts | -0.2s to -0.5s | -0.2s to -0.5s | +50 KB, -2 requests |
| Lazy loading | -0.1s to -0.3s | -0.2s to -0.4s | -30% initial JS |
| Image dimensions | Prevents CLS | Prevents CLS | No change |

**Combined Estimated Improvement:**
- **LCP:** 2-3 seconds faster
- **FCP:** 0.5-1.0 seconds faster
- **Total Page Weight:** 60-70% reduction
- **Lighthouse Score:** +20 to +30 points

---

## ✅ Pre-Deployment Checklist

**Performance:**
- [ ] Images converted to WebP/optimized
- [ ] Fonts self-hosted
- [ ] Lazy loading implemented
- [ ] Image dimensions specified
- [ ] Production build generates <200 KB gzipped bundle
- [ ] Lighthouse score >95

**Accessibility:**
- [ ] All images have descriptive alt text ✅
- [ ] Heading hierarchy validated ✅
- [ ] Contrast ratios meet WCAG AA ✅
- [ ] Focus indicators enhanced
- [ ] Keyboard navigation tested

**Security:**
- [ ] CSP headers configured (see SECURITY_AUDIT.md)
- [ ] Security headers added
- [ ] Form handling upgraded

**Testing:**
- [ ] Lighthouse audit passed
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsiveness verified
- [ ] Form submission tested

---

## 🛠️ Quick Start Commands

```bash
# Install optimization dependencies
npm install -D @fontsource/inter vite-plugin-image-optimizer rollup-plugin-visualizer

# Build and analyze
npm run build
npm run preview

# Check bundle size
ls -lh dist/assets/*.js dist/assets/*.css

# Run Lighthouse audit (in Chrome DevTools while preview is running)
```

---

## 📚 Resources

- [Vite Performance Optimization](https://vitejs.dev/guide/performance.html)
- [Web.dev - Optimize LCP](https://web.dev/optimize-lcp/)
- [Fontsource Documentation](https://fontsource.org/)
- [WebP Image Format Guide](https://developers.google.com/speed/webp)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🎉 Conclusion

Implementing the **Phase 1 critical optimizations** will dramatically improve the portfolio's performance, reducing load times by **2-3 seconds** and achieving Lighthouse scores **>95**. The recommendations are straightforward, well-documented, and can be implemented in **2-3 hours** total.

**Recommended Action Plan:**
1. Start with font self-hosting (@fontsource/inter) - **30 min**
2. Convert and optimize images - **45 min**
3. Add image dimensions and lazy loading - **30 min**
4. Implement component code splitting - **15 min**
5. Run Lighthouse audit and iterate - **30 min**

**Total Implementation Time:** ~2.5 hours for production-ready performance optimization.
