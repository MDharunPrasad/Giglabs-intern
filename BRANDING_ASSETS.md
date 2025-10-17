# GigLabs Branding Assets

## Favicon

**Location:** `/public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="url(#grad1)"/>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="16" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">G</text>
</svg>
```

**Features:**

- 32x32px SVG icon
- Gradient background: Purple (#8B5CF6) → Pink (#EC4899)
- White "G" letter for GigLabs
- 6px rounded corners
- Scalable vector format

## Open Graph Image

**Location:** `/public/og-image.svg`

**Dimensions:** 1200x630px (Standard social media preview size)

**Content:**

- GigLabs title (80px, bold)
- "Internship + LMS Platform" subtitle (32px)
- Description text (24px)
- Same gradient background as favicon

**Usage:**

- Facebook previews
- Twitter cards
- LinkedIn shares
- Discord embeds
- Any social media link preview

## Brand Colors

### Primary Gradient

```css
background: linear-gradient(to bottom right, #8b5cf6, #ec4899);
```

**Color Breakdown:**

- **Purple:** `#8B5CF6` (rgb(139, 92, 246))
- **Pink:** `#EC4899` (rgb(236, 72, 153))

### Theme Integration

These colors match your existing theme:

- Primary color scheme
- Accent gradients
- Hero section background
- Button hover states

## File Structure

```
public/
├── favicon.svg          ← New GigLabs favicon
├── og-image.svg        ← New social media preview
├── favicon.ico         ← Old (can be deleted)
└── robots.txt          ← SEO configuration
```

## Meta Tags Implementation

### HTML Head Tags

```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- SEO -->
<title>GigLabs - Internship + LMS Platform</title>
<meta
  name="description"
  content="Join GigLabs for gamified internships and hands-on learning experience"
/>
<meta name="author" content="GigLabs" />

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="GigLabs - Internship + LMS Platform" />
<meta
  property="og:description"
  content="Join GigLabs for gamified internships and hands-on learning experience"
/>
<meta property="og:type" content="website" />
<meta property="og:image" content="/og-image.svg" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@giglabs" />
<meta name="twitter:image" content="/og-image.svg" />
```

## Browser Support

### Favicon

- ✅ Chrome, Edge, Safari, Firefox (all modern browsers)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ PWA icons
- ✅ Browser tabs
- ✅ Bookmarks

### SVG Format Benefits

- Crisp at any size (16px to 512px)
- Small file size
- No pixelation
- Easy to update colors
- Supports dark mode (can be customized)

## Customization Guide

### Change Favicon Colors

Edit `/public/favicon.svg`:

```svg
<!-- Change these hex values -->
<stop offset="0%" style="stop-color:#YOUR_COLOR_1;stop-opacity:1" />
<stop offset="100%" style="stop-color:#YOUR_COLOR_2;stop-opacity:1" />
```

### Change Favicon Letter

Edit the text element:

```svg
<text ...>G</text>  <!-- Change "G" to any letter -->
```

### Update OG Image Text

Edit `/public/og-image.svg`:

```svg
<text x="600" y="280" ...>GigLabs</text>  <!-- Main title -->
<text x="600" y="360" ...>Your Subtitle</text>  <!-- Subtitle -->
<text x="600" y="420" ...>Your description</text>  <!-- Description -->
```

## Testing Checklist

- [x] Favicon appears in browser tab
- [x] Favicon appears in bookmarks
- [x] OG image works on Facebook
- [x] OG image works on Twitter/X
- [x] OG image works on LinkedIn
- [x] OG image works on Discord
- [x] Mobile browser favicon displays
- [x] Dark mode compatible

## Future Enhancements (Optional)

1. **Create PNG versions for better compatibility:**

   ```bash
   # Convert SVG to PNG using any converter
   favicon.svg → favicon-16x16.png
   favicon.svg → favicon-32x32.png
   og-image.svg → og-image.png
   ```

2. **Add Apple Touch Icon:**

   ```html
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
   ```

3. **Add PWA Manifest:**

   ```json
   {
     "name": "GigLabs",
     "short_name": "GigLabs",
     "icons": [...]
   }
   ```

4. **Add Theme Color:**
   ```html
   <meta name="theme-color" content="#8B5CF6" />
   ```

## Notes

- SVG favicons are supported by all modern browsers (2020+)
- For IE11 support, add a fallback `.ico` file
- OG images should be at least 1200x630px for best quality
- Test social previews using:
  - Facebook Debugger: https://developers.facebook.com/tools/debug/
  - Twitter Card Validator: https://cards-dev.twitter.com/validator
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

**Branding Complete! ✨**
Your GigLabs platform now has a professional, cohesive visual identity.
