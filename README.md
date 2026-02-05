# TVXR Dashboard

A React-based dashboard for tracking relational intelligence growth and conversation skills development.

## Features

- **Growth Stages Visualization** — Track progress through developmental stages (Egg → Butterfly)
- **Focus Area Cards** — Interactive gauges showing mastery across 5 focus areas
- **Conversation Moves** — Segmented progress bars with color-coded score history
- **Stats Overview** — Key metrics including attempts, practice time, scenarios, and streaks
- **Loading States** — Shimmer skeletons for smooth data fetching experience

## Tech Stack

- **React 19** + **Vite** — Fast development and builds
- **Tailwind CSS v4** — Utility-first styling
- **shadcn/ui** — Accessible UI components
- **Supabase** — Backend database and authentication
- **Lucide React** — Icon library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd tvxr-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── App.jsx                 # Main app component
├── App.css                 # Global styles + Tailwind config
├── main.jsx                # App entry point
├── supabase.js             # Supabase client
│
├── components/             # UI Components
│   ├── index.js            # Barrel exports
│   ├── ConversationMoves.jsx
│   ├── FocusAreaCard.jsx
│   ├── FocusAreasGrid.jsx
│   ├── Gauge.jsx           # SVG gauge component
│   ├── GrowthStages.jsx
│   ├── PracticeCard.jsx
│   ├── ScoreProgressBar.jsx
│   ├── Skeleton.jsx        # Loading shimmer
│   ├── StatCard.jsx
│   ├── StatsGrid.jsx
│   ├── TipCard.jsx
│   └── ui/                 # shadcn/ui components
│
├── hooks/                  # Custom React hooks
│   ├── index.js
│   ├── useDashboardData.js # Dashboard data fetching
│   └── useRiqs.js          # RIQ data fetching
│
├── constants/              # App constants
│   └── index.js            # Focus areas, growth stages
│
└── lib/
    └── utils.js            # Utility functions
```

## Database Schema

### `dashboard` table
| Column | Type | Description |
|--------|------|-------------|
| userid | string | User identifier |
| total_attempts | number | Total practice attempts |
| time_practicing | number | Minutes spent practicing |
| scenarios_played | number | Completed scenarios |
| growth_streak | number | Current streak |
| next_steps | string | Recommended focus area |

### `riq` table
| Column | Type | Description |
|--------|------|-------------|
| focus_area | string | Associated focus area |
| display_label | string | Human-readable move name |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT
