# Quickstart: Academy Garden Color Refresh Verification

This guide outlines the immediate verification steps for the brand identity migration from Purple to Emerald/Teal.

## Visual Verification Flow

### 1. Launch Dev Server
Ensure the application is running:
```bash
pnpm dev
```

### 2. Verify Setup Page (Light Mode)
- **Title**: "Hangman Creator" should have a smooth Emerald-to-Teal gradient.
- **Buttons**: The "Start" and "Add Word" buttons must be Emerald green (`#2E7D32`).
- **Shadow**: Primary buttons should have a soft Emerald shadow (`rgba(46, 125, 50, 0.4)`).
- **Background**: The overall page background must be a soft mint-gray (`#F0F4F2`).

### 3. Verify Play Page (Dark Mode)
- **Primary Color**: Letters and navigation buttons should be Vibrant Emerald (`#66BB6A`).
- **Secondary Color**: Wrong guesses and progress indicators should be Aqua Teal (`#4DB6AC`).

### 4. Interactive Elements
- **Word Chips**: When adding words, chips should have an emerald tint.
- **Blur Effect**: Blurred words in the list must use a subtle emerald blur.
- **Slider**: The mistakes slider must have an emerald-teal progress track.

## Success Checklist
- [ ] No purple hex codes (`#7C4DFF`) remain in visual elements.
- [ ] Text remains highly legible across all themed backgrounds.
- [ ] Dark mode feels balanced and focused for students.
