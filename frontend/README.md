# CAN 2025 Predictor - Frontend 🏆

A modern sports analytics dashboard for Africa Cup of Nations 2025 predictions.

## Features

- **Dashboard** - Overview of predictions with champion card and probability charts
- **Tournament Simulation** - Interactive bracket simulation with animated results
- **Bracket Predictor** - Watch AI predict matches step-by-step
- **Match Predictor** - Drag & drop interface to predict any matchup
- **About Model** - Detailed ML pipeline and feature engineering explanations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualizations
- **Lucide Icons** - Modern icon set

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── simulation/page.tsx   # Tournament Simulation
│   ├── bracket/page.tsx      # Bracket Predictor
│   ├── match/page.tsx        # Match Predictor
│   ├── about/page.tsx        # About Model
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── ChampionCard.tsx      # Champion display
│   ├── TeamCard.tsx          # Team info card
│   ├── MatchCard.tsx         # Match result card
│   ├── ProbabilityChart.tsx  # Bar chart
│   └── StatsGrid.tsx         # Stats overview
├── lib/
│   ├── data.ts               # Team data & prediction logic
│   └── utils.ts              # Utility functions
└── package.json
```

## Design System

### Colors
- **CAF Green**: `#0f766e` - Primary brand color
- **Gold**: `#facc15` - Champions, winners
- **Dark**: `#0a0a0a` - Background
- **Glassmorphism** - Cards with blur effects

### Typography
- **Poppins** - Display headings
- **Inter** - Body text
- **JetBrains Mono** - Numbers & code

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Screenshots

### Dashboard
Main overview with champion prediction and top 5 teams.

### Tournament Simulation
Full bracket simulation from Round of 16 to Final.

### Match Predictor
Drag & drop interface for custom matchup predictions.

## License

MIT
