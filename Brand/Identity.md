# TrailLearn Brand Identity

> **Version**: 1.0
> **Last Updated**: November 2025
> **Status**: Active

---

## Brand Overview

**TrailLearn** is an AI-assisted learning and orientation platform empowering students and young professionals worldwide to discover scholarships, navigate international integration, connect with mentors, and plan their academic and career paths.

### Mission
To guide every student on their unique educational journey, removing barriers and creating pathways to global opportunities.

### Vision
A world where every student has access to personalized guidance, resources, and mentorship to achieve their academic and professional dreams.

### Core Values
- **Accessibility**: Education opportunities for all, regardless of background
- **Empowerment**: Equipping students with tools and knowledge to succeed
- **Community**: Building connections between students, mentors, and professionals
- **Innovation**: Leveraging AI to personalize the learning journey
- **Trust**: Providing reliable, verified information and support

---

## Color Palette

### Primary Colors

#### Deep Blue (Primary Brand Color)
**Use**: Main brand color, headers, primary CTAs, navigation
```
Hex: #2563EB
RGB: rgb(37, 99, 235)
Tailwind: blue-600

Variants:
- 50:  #EFF6FF (backgrounds, hover states)
- 100: #DBEAFE (light backgrounds)
- 500: #3B82F6 (alternative primary)
- 600: #2563EB (MAIN BRAND COLOR)
- 700: #1D4ED8 (hover, active states)
- 900: #1E3A8A (dark mode, footer)
```

**Why**: Represents trust, professionalism, stability - core values in education. Associated with LinkedIn, universities, and reliable platforms.

#### Emerald Green (Secondary)
**Use**: Success states, progress indicators, growth metrics, achievements
```
Hex: #10B981
RGB: rgb(16, 185, 129)
Tailwind: emerald-500

Variants:
- 50:  #ECFDF5 (success backgrounds)
- 100: #D1FAE5 (subtle highlights)
- 500: #10B981 (MAIN SECONDARY COLOR)
- 600: #059669 (hover states)
- 700: #047857 (active states)
```

**Why**: Symbolizes growth, journey, success - aligns with student progression and achievement.

#### Amber (Accent)
**Use**: Important CTAs, notifications, highlights, urgency indicators
```
Hex: #F59E0B
RGB: rgb(245, 158, 11)
Tailwind: amber-500

Variants:
- 50:  #FFFBEB (light backgrounds)
- 100: #FEF3C7 (subtle accents)
- 500: #F59E0B (MAIN ACCENT COLOR)
- 600: #D97706 (hover states)
- 700: #B45309 (active states)
```

**Why**: Conveys energy, optimism, action - perfect for CTAs and deadline alerts.

### Neutral Colors

#### Slate Gray (Text & UI)
**Use**: Body text, borders, UI elements, subtle backgrounds
```
50:  #F8FAFC (page backgrounds)
100: #F1F5F9 (card backgrounds)
200: #E2E8F0 (borders, dividers)
300: #CBD5E1 (disabled states)
400: #94A3B8 (placeholders)
500: #64748B (secondary text)
600: #475569 (body text)
700: #334155 (headings)
800: #1E293B (dark mode backgrounds)
900: #0F172A (dark mode text)
```

### Semantic Colors

#### Success (Green)
```
Hex: #10B981 (Emerald 500)
Use: Success messages, completed goals, verified profiles
```

#### Warning (Amber)
```
Hex: #F59E0B (Amber 500)
Use: Warnings, approaching deadlines, important notices
```

#### Error (Red)
```
Hex: #EF4444 (Red 500)
Use: Error messages, failed actions, critical alerts
```

#### Info (Blue)
```
Hex: #3B82F6 (Blue 500)
Use: Informational messages, tips, helpful hints
```

---

## Color Usage Guidelines

### Do's ✅
- **Primary Blue**: Use for main navigation, primary buttons, links
- **Emerald Green**: Use for progress bars, achievement badges, success states
- **Amber**: Use sparingly for CTAs like "Apply Now", "Book Session", deadline warnings
- **High Contrast**: Ensure text meets WCAG AA (4.5:1 ratio minimum)
- **Consistent Palette**: Use defined variants, don't create custom colors

### Don'ts ❌
- **Avoid Red for Educational Content**: Red signals stress/urgency (use sparingly for errors only)
- **Don't Mix Too Many Colors**: Stick to 2-3 colors per screen maximum
- **Don't Use Low Contrast**: Always test accessibility with tools like WebAIM
- **Don't Override Semantic Colors**: Green = success, Red = error (keep consistent)

### Accessibility Requirements
- **Text on White**: Use slate-700 (#334155) or darker
- **Text on Blue**: Use white (#FFFFFF) - ratio 4.59:1 ✅
- **Text on Green**: Use white (#FFFFFF) - ratio 4.04:1 ✅
- **Text on Amber**: Use slate-900 (#0F172A) - ratio 8.32:1 ✅
- **Interactive Elements**: Minimum 44x44px touch targets (mobile)

---

## Typography

### Font Families

#### Primary (Headings & UI)
**Inter** (Sans-serif)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- **Use**: Headings, navigation, buttons, UI elements
- **Why**: Modern, clean, highly readable at all sizes
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Source**: Google Fonts (free)

#### Secondary (Body Text)
**Inter** (Same as primary for consistency)
```css
font-family: 'Inter', system-ui, sans-serif;
```
- **Use**: Body text, paragraphs, descriptions
- **Weight**: 400 (Regular), 500 (Medium for emphasis)

#### Monospace (Code & Data)
**JetBrains Mono** or **Fira Code**
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```
- **Use**: Code snippets, API keys, technical content
- **Weight**: 400 (Regular)

### Font Sizes (Mobile-First)

```css
/* Headings */
h1: 2rem (32px)    // Page titles
h2: 1.5rem (24px)  // Section headers
h3: 1.25rem (20px) // Card headers
h4: 1.125rem (18px) // Subsections

/* Body */
body: 1rem (16px)     // Base text
small: 0.875rem (14px) // Meta info, captions
xs: 0.75rem (12px)    // Labels, badges

/* Desktop (min-width: 768px) */
h1: 2.5rem (40px)
h2: 2rem (32px)
h3: 1.5rem (24px)
body: 1rem (16px)
```

### Line Heights
```css
headings: 1.2 (tight)
body: 1.6 (relaxed, better readability)
captions: 1.4 (normal)
```

### Letter Spacing
```css
headings: -0.02em (slightly tight)
body: normal
labels: 0.025em (slightly loose for all-caps)
```

---

## Logo Guidelines

### Logo Files
All logo variations are stored in `/Brand/logos/`:

```
/logos
  ├── traillearn-logo-full.svg          # Full logo (icon + text)
  ├── traillearn-logo-icon.svg          # Icon only
  ├── traillearn-logo-wordmark.svg      # Text only
  ├── traillearn-logo-full-white.svg    # Full logo (white for dark bg)
  ├── traillearn-logo-icon-white.svg    # Icon only (white)
  └── traillearn-logo-wordmark-white.svg # Text only (white)
```

### Logo Usage Rules

#### Primary Logo (Full)
- **Use**: Website header, marketing materials, presentations
- **Minimum Size**: 120px width (web), 1 inch width (print)
- **Clear Space**: Maintain minimum padding equal to "T" letter height on all sides
- **Background**: Use on white, slate-50, or images with sufficient contrast

#### Icon Logo
- **Use**: Favicon, app icon, social media profile, small spaces
- **Minimum Size**: 32px × 32px (web), 0.5 inch (print)
- **Square Format**: Ensure equal padding on all sides

#### Wordmark Logo
- **Use**: Footer, email signatures, horizontal layouts
- **Minimum Size**: 100px width (web)

#### Logo Colors
- **Primary**: Deep Blue (#2563EB) text + Emerald accent
- **On Dark**: White (#FFFFFF) with subtle glow/shadow
- **Monochrome**: Use when color not available (slate-900 or white)

#### Don'ts ❌
- ❌ Don't stretch or distort the logo
- ❌ Don't change logo colors (except approved variations)
- ❌ Don't add effects (shadows, gradients, outlines) unless specified
- ❌ Don't place on busy backgrounds without sufficient contrast
- ❌ Don't use low-resolution raster versions (always use SVG when possible)

---

## Voice & Tone

### Brand Voice
**Friendly Expert**: We're knowledgeable guides, not intimidating authorities.

**Characteristics**:
- **Approachable**: Conversational, warm, relatable
- **Empowering**: "You can do this" vs "You must do this"
- **Clear**: Simple language, avoid jargon
- **Encouraging**: Celebrate progress, provide motivation
- **International**: Inclusive, culturally aware

### Tone Variations

#### Educational Content
**Tone**: Clear, structured, helpful
```
Example: "Your scholarship journey starts with three key steps:
profile completion, document preparation, and application tracking."
```

#### AI Coach/Chatbot
**Tone**: Friendly, personalized, encouraging
```
Example: "Great progress on your profile, Sarah! Based on your
Computer Science background, I found 12 scholarships that match
your goals. Let's explore the top 3 together."
```

#### Error Messages
**Tone**: Calm, solution-focused, supportive
```
❌ Bad: "Error: Invalid credentials"
✅ Good: "Hmm, that password doesn't match our records.
Try again or reset your password."
```

#### Success Messages
**Tone**: Celebratory, motivating
```
✅ "Amazing! Your profile is now 100% complete. You're ready
to start applying to scholarships!"
```

### Language Guidelines

#### Do's ✅
- Use "you/your" (direct address)
- Use active voice: "Complete your profile" vs "Your profile should be completed"
- Use contractions for friendliness: "Let's go" vs "Let us go"
- Use inclusive language: "everyone", "students", "learners"
- Provide context: Explain WHY actions matter

#### Don'ts ❌
- Avoid jargon: "onboarding flow" → "getting started"
- Avoid corporate speak: "leverage synergies" → "work together"
- Avoid assumptions: Don't assume English is first language
- Avoid urgency manipulation: "Last chance!" (unless genuinely true)
- Avoid gendered language: Use "they/them" for generic examples

---

## Imagery & Photography

### Photography Style
- **Authentic**: Real students, diverse backgrounds
- **Aspirational**: Show success, achievement, growth
- **Global**: Represent international audience
- **Bright**: Well-lit, optimistic, energetic
- **Diverse**: Various ethnicities, genders, abilities, ages

### Image Sources
- **Unsplash**: Free, high-quality, diverse
- **Pexels**: Free, educational context
- **Custom Photography**: For team, events, testimonials

### Image Guidelines
- **Aspect Ratios**: 16:9 (heroes), 4:3 (cards), 1:1 (profiles)
- **File Formats**: WebP (preferred), JPEG (fallback), SVG (icons/illustrations)
- **Optimization**: Max 100KB for thumbnails, 300KB for full images
- **Alt Text**: Always provide descriptive alt text for accessibility

---

## Iconography

### Icon Style
- **Outline Icons**: Consistent 2px stroke weight
- **Rounded Corners**: 2px radius for friendliness
- **24px Grid**: Design on 24×24px grid for consistency
- **Minimal**: Simple, recognizable, not overly detailed

### Icon Libraries
- **Heroicons** (primary): Matches Tailwind CSS, free, MIT license
- **Lucide Icons** (secondary): Consistent style, extensive set
- **Custom Icons**: Only when needed, follow same style guidelines

### Icon Usage
- **Navigation**: 20-24px size
- **Buttons**: 16-20px size
- **Inline Text**: 16px size (match text height)
- **Feature Cards**: 32-48px size
- **Color**: Inherit text color or use semantic colors

---

## UI Components Style

### Buttons

#### Primary Button
```css
Background: Blue-600 (#2563EB)
Text: White
Hover: Blue-700 (#1D4ED8)
Padding: 12px 24px
Border Radius: 8px
Font: Inter Semibold (600)
```

#### Secondary Button
```css
Background: Transparent
Text: Blue-600
Border: 2px solid Blue-600
Hover: Blue-50 background
Padding: 12px 24px
Border Radius: 8px
```

#### Accent Button (CTA)
```css
Background: Amber-500 (#F59E0B)
Text: Slate-900
Hover: Amber-600 (#D97706)
Padding: 12px 24px
Border Radius: 8px
Font: Inter Semibold (600)
```

### Cards
```css
Background: White
Border: 1px solid Slate-200
Border Radius: 12px
Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
Padding: 24px
```

### Forms
```css
Input Border: 1px solid Slate-300
Input Focus: 2px solid Blue-600
Input Radius: 8px
Input Padding: 12px
Label: Slate-700, 14px, Semibold
Placeholder: Slate-400
Error: Red-500 border, Red-600 text
```

---

## Animation & Motion

### Principles
- **Purposeful**: Animations guide attention, don't distract
- **Fast**: 150-300ms for UI transitions
- **Smooth**: Use easing curves (ease-in-out)
- **Respectful**: Honor prefers-reduced-motion

### Common Animations
```css
/* Button Hover */
transition: all 150ms ease-in-out;

/* Page Transitions */
transition: opacity 300ms ease-in-out;

/* Card Hover */
transition: transform 200ms ease-out, box-shadow 200ms ease-out;

/* Loading Spinners */
animation: spin 1s linear infinite;
```

### Reduce Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Spacing & Layout

### Spacing Scale (Tailwind)
```
0.5: 2px    (tight spacing)
1:   4px
2:   8px    (small gaps)
3:   12px
4:   16px   (default gap)
6:   24px   (section spacing)
8:   32px   (large sections)
12:  48px   (page sections)
16:  64px   (hero sections)
```

### Grid System
- **Mobile**: 1 column, 16px margin
- **Tablet**: 2 columns, 24px gap
- **Desktop**: 12 columns, 24px gap
- **Max Width**: 1280px (xl container)

---

## Accessibility Standards

### WCAG 2.1 AA Compliance (Minimum)

#### Color Contrast
- **Normal Text**: 4.5:1 ratio minimum
- **Large Text** (18px+): 3:1 ratio minimum
- **UI Components**: 3:1 ratio minimum

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators (2px blue outline)
- Logical tab order

#### Screen Readers
- Semantic HTML (h1-h6, nav, main, article)
- Alt text for all images
- ARIA labels for icon buttons
- Form labels associated with inputs

#### Responsive Design
- Mobile-first approach
- Touch targets: 44×44px minimum
- Text: 16px minimum (no pinch-to-zoom needed)
- Horizontal scrolling: Never required

---

## File Naming Conventions

### Image Files
```
traillearn-[context]-[descriptor]-[variant].[ext]

Examples:
traillearn-hero-students-studying.jpg
traillearn-icon-scholarship-primary.svg
traillearn-profile-mentor-john-doe.jpg
traillearn-event-webinar-ai-careers-thumbnail.jpg
```

### Component Files
```
[ComponentName].tsx
[ComponentName].module.css
[ComponentName].test.tsx

Examples:
ScholarshipCard.tsx
ScholarshipCard.module.css
ScholarshipCard.test.tsx
```

---

## Brand Assets Checklist

### Logos ✅
- [ ] Full logo (SVG, PNG @1x, @2x, @3x)
- [ ] Icon only (SVG, PNG @1x, @2x, @3x)
- [ ] Wordmark (SVG, PNG @1x, @2x, @3x)
- [ ] White variations for dark backgrounds
- [ ] Favicon (16x16, 32x32, 48x48, ICO)
- [ ] App icons (iOS, Android, PWA)

### Marketing Materials
- [ ] Social media templates (Facebook, LinkedIn, Instagram, Twitter)
- [ ] Email signature template
- [ ] Presentation deck template (PowerPoint/Google Slides)
- [ ] One-pager (PDF)
- [ ] Business cards template

### Digital Assets
- [ ] Open Graph images (1200x630px)
- [ ] Twitter Card images (1200x600px)
- [ ] LinkedIn banner (1584x396px)
- [ ] Hero images (1920x1080px)

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Nov 2025 | Initial brand identity guidelines | TrailLearn Team |

---

## Contact & Questions

For brand guideline questions or asset requests:
- **Email**: brand@traillearn.com
- **Design Team**: design@traillearn.com
- **Asset Repository**: `/Brand/assets/`

---

**© 2025 TrailLearn. All rights reserved.**