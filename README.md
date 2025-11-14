# AI Real Estate Estimator

Advanced machine learning application for Belgian property price prediction. Built with modern web technologies and client-side ML algorithms.

## 🚀 Tech Stack

- **Vite** - Lightning-fast build tool
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Powerful data synchronization
- **Zustand** - Lightweight state management
- **TailwindCSS 4** - Utility-first styling
- **ky** - Modern HTTP client

## 🧠 ML Algorithms

- **Linear Regression** - Fast, interpretable baseline
- **k-Nearest Neighbors** - Instance-based learning
- **Decision Trees** - Rule-based predictions
- **Random Forest** - Ensemble method for accuracy

## 📦 Installation

```bash
npm install
```

## 🛠 Development

```bash
npm run dev
```

## 🏗 Build

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/       # Shared UI components
│   └── ui/          # Base UI library (Radix UI)
├── features/        # Feature modules
│   ├── estimator/   # Price estimation feature
│   ├── algorithms/  # Algorithm comparison
│   ├── insights/    # Market insights
│   └── methodology/ # About & methodology
├── hooks/           # Custom React hooks
├── lib/             # Core utilities
│   ├── router.ts    # TanStack Router config
│   ├── queryClient.ts # TanStack Query config
│   ├── http.ts      # HTTP client (ky)
│   ├── data-loader.ts # Data management
│   ├── ml-models.ts  # ML algorithm implementations
│   └── utils.ts     # Helper functions
├── providers/       # Context providers
├── routes/          # Route definitions
│   ├── __root.tsx   # Root layout
│   ├── index.tsx    # Home (estimator)
│   ├── algorithms.tsx
│   ├── insights.tsx
│   └── methodology.tsx
├── stores/          # Zustand stores
└── styles/          # Global styles

## ✨ Features

- **Client-Side ML**: All processing in the browser - no backend needed
- **Real-Time Predictions**: Instant results with performance metrics
- **Multiple Algorithms**: Compare 4 different ML approaches
- **Market Insights**: Visualize Belgian real estate trends
- **Type-Safe**: Full TypeScript coverage
- **Modern Architecture**: Clean, maintainable code structure

## 📊 Dataset

Trained on 2,500+ Belgian real estate transactions covering:
- 14 major Belgian cities
- 5 property types
- Historical data from 2020-2024

## 🎨 Design Philosophy

Built with a focus on:
- Natural, human-centered UI
- Thoughtful spacing and color balance
- Smooth transitions and interactions
- Accessibility and usability

## 📝 License

MIT
```
