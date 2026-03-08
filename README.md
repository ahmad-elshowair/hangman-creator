# 🎮 Hangman Game Creator

A beautiful, teacher-friendly Hangman game built with **Next.js**, **TypeScript**, and **MUI**. Set up custom word lists for your students, configure difficulty, and let them play — right in the browser!

## ✨ Features

- **🎯 Teacher Setup** — Add words, set max allowed mistakes, and launch the game with one click
- **⌨️ Interactive Gameplay** — On-screen keyboard with color-coded feedback (green for correct, red for wrong)
- **🎨 Animated Hangman** — SVG figure that draws progressively as mistakes increase
- **🌗 Light / Dark Mode** — Toggle between themes, preference saved in localStorage
- **💾 Persistent State** — Word lists and settings survive page refreshes via localStorage
- **📊 End-of-Game Summary** — See your score, win/loss breakdown, and per-word results
- **📱 Responsive Design** — Works on desktop and mobile screens

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (recommended)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hangman-creator

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating your Hangman game!

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [MUI v7](https://mui.com/) | Component library and theming |
| [Emotion](https://emotion.sh/) | CSS-in-JS styling |
| [Outfit](https://fonts.google.com/specimen/Outfit) | Google Font |

## 📁 Project Structure

```text
src/
├── app/
│   ├── page.tsx          # Teacher Setup page
│   ├── play/page.tsx     # Game Player page
│   ├── layout.tsx        # Root layout with theme + footer
│   └── globals.css       # Base CSS styles
├── components/
│   ├── HangmanFigure.tsx # Animated SVG hangman
│   ├── Keyboard.tsx      # On-screen letter keyboard
│   ├── WordDisplay.tsx   # Masked word with blanks
│   ├── ThemeToggle.tsx   # Light/Dark mode toggle
│   ├── ThemeRegistry.tsx # MUI ThemeProvider wrapper
│   └── Footer.tsx        # Footer with attribution
├── hooks/
│   └── useHangman.ts     # Game logic hook
├── utils/
│   └── storage.ts        # localStorage helpers
├── context/
│   └── ThemeModeContext.tsx # Theme mode context
└── theme.ts              # Light & dark MUI themes
```

## 📝 How It Works

1. **Setup** — The teacher visits the home page, sets the maximum number of mistakes, and adds words to the list
2. **Play** — Click "Start Game" and hand the device to a student. They guess letters using the keyboard
3. **Progress** — After each word (win or lose), click "Next Word" to continue
4. **Results** — After all words are completed, a summary screen shows the final score

## 👤 Author

Created with ❤️ by [Ahmad Elshowair](https://www.linkedin.com/in/ahmad-elshowair/)
