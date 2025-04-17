# COVID Stats Dashboard

A fully-typed, React + TypeScript app for tracking COVID-19 statistics globally and by country, including province-level data, with robust state management and efficient API integration.

---

## 🚀 Tech Stack

- **React** (v19) – Component-based UI
- **TypeScript** – Static typing for safety and clarity
- **Redux Toolkit (RTK)** – Simplified global state management
- **RTK Query** – Declarative, performant data fetching with built-in caching
- **Axios** – HTTP client via custom RTK Query base query
- **Vitest** – Fast, modern unit testing
- **React Testing Library** – Focused on testing behavior over implementation
- **CSS Modules** – Scoped styles per component
- **MSW (Mock Service Worker)** – API mocking for reliable tests

---

## Design Notes

### Why Redux Toolkit and RTK Query?

Redux Toolkit (RTK) and RTK Query are used to streamline complex global state and asynchronous API data management:

- **RTK Query benefits:**
  - Automatic **caching**, **deduplication**, and **invalidations**
  - Handles **loading**, **error**, and **fetching** states out of the box
  - Built-in support for polling and optimistic updates
  - Centralizes all data fetching logic, making it testable and predictable

> RTK Query reduces the need for custom data-fetching logic, improving performance and reducing bugs due to stale or duplicated requests.

### Axios + Custom Base Query

- A custom `axiosBaseQuery` is used in the RTK Query `createApi()` configuration to:
  - Customize headers and request format
  - Provide consistent error formatting across all endpoints

### State Organization

- The `state/` folder contains:
  - Redux slices for local UI states (e.g., selected country, selected mode)
  - `covidApi.ts` defining RTK Query endpoints for COVID data and `countriesApi.ts` for countries list
- Global store setup is modularized for testing and future scalability

### Testing Strategy

- **Unit tests** are written using Vitest + React Testing Library
- MSW is used to simulate real API responses during tests
- Global components like `WithLoadingAndError` are **mocked** during tests for focus and speed
- Utility files like `renderWithProviders` help wrap components with store/context for testing

### Theme System

- The app supports 3 theme modes: **dark**, **light**, and **auto**
- Theme preference is stored in `localStorage`
- A custom hook `useAppTheme()`:
  - Reads theme from `localStorage`
  - If mode is `"auto"`, uses `window.matchMedia()` to detect system theme
  - Returns `"dark"` or `"light"` accordingly
- This makes the theme consistent across reloads and adaptable to system changes

### Global CSS: 

- Typography, theme-based colors (light/dark), spacing, shadow, and border radius styles are defined in index.css for consistent styling across the app.
---

## 🗂️ Folder Structure
```bash
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── BarChart
│   │   │   ├── BarChart.test.tsx
│   │   │   └── index.tsx
│   │   ├── Card
│   │   │   ├── Card.module.css
│   │   │   ├── Card.test.tsx
│   │   │   └── index.tsx
│   │   ├── CountryCovidData
│   │   │   ├── CountryCovidData.module.css
│   │   │   ├── CountryCovidData.test.tsx
│   │   │   └── index.tsx
│   │   ├── CountrySelector
│   │   │   ├── CountrySelector.test.tsx
│   │   │   └── index.tsx
│   │   ├── Dropdown
│   │   │   ├── Dropdown.module.css
│   │   │   ├── Dropdown.test.tsx
│   │   │   └── index.tsx
│   │   ├── GlobalCovidData
│   │   │   ├── GlobalCovidData.test.tsx
│   │   │   └── index.tsx
│   │   ├── Header
│   │   │   ├── Header.module.css
│   │   │   ├── Header.test.tsx
│   │   │   └── index.tsx
│   │   ├── LoadingSpinner
│   │   │   ├── index.tsx
│   │   │   ├── LoadingSpinner.module.css
│   │   │   └── LoadingSpinner.test.tsx
│   │   ├── Navbar
│   │   │   ├── index.tsx
│   │   │   ├── Navbar.module.css
│   │   │   └── Navbar.test.tsx
│   │   ├── Nodata
│   │   │   ├── index.tsx
│   │   │   ├── NoData.module.css
│   │   │   └── NoData.test.tsx
│   │   ├── StatSection
│   │   │   ├── index.tsx
│   │   │   ├── StatSection.module.css
│   │   │   └── StatSection.test.tsx
│   │   └── WithLoadingAndError
│   │       ├── index.tsx
│   │       ├── WithLoadingAndError.module.css
│   │       └── WithLoadingAndError.test.tsx
│   ├── constants
│   │   └── chart.ts
│   ├── hooks
│   │   ├── storeHooks.ts
│   │   └── useAppTheme.tsx
│   ├── pages
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── services
│   │   └── axiosBaseQuery.ts
│   ├── state
│   │   ├── countries
│   │   │   ├── countriesApi.ts
│   │   │   └── selectedCountrySlice.ts
│   │   ├── covid
│   │   │   └── covidApi.ts
│   │   ├── theme
│   │   │   └── themeSlice.ts
│   │   └── store.ts
│   ├── tests
│   │   ├── mocks
│   │   │   ├── handlers.ts
│   │   │   └── mockServer.ts
│   │   └── setup
│   │       ├── setupTests.ts
│   │       └── test-utils.tsx
│   ├── types
│   │   ├── components
│   │   │   ├── Card.types.ts
│   │   │   ├── Dropdown.types.ts
│   │   │   ├── Header.types.ts
│   │   │   ├── StatsBarChart.types.ts
│   │   │   ├── StatSection.types.ts
│   │   │   └── WithLoadingAndError.types.ts
│   │   ├── api.types.ts
│   │   └── theme.types.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx

```

## Features

#### Global COVID-19 Statistics
- Displays total **confirmed**, **recovered**, **active** and **death** counts.
- Data is fetched using **RTK Query** with automatic **caching and re-fetching**.

#### Country-Specific Statistics
- Users can **select a country** from a dropdown.
- Displays that country's **confirmed**, **recovered**, **active** and **death** statistics.

#### Top 8 Provinces – Bar Chart
- Shows a **bar chart** comparing:
  - Confirmed cases
  - Recovered cases
  - Deaths
- Focuses on the **top 8 provinces** ranked by most confirmed cases.

#### Theming Support
- Supports **Light**, **Dark**, and **Auto** theme modes.
- **Auto mode** adapts to the user's system preference.
- Theme selection is **saved in localStorage**.

### Additional Notes

- The current API used does **not support querying historical data** across all years for a specific country.
- This limitation makes it difficult to accurately display trends over time.
- One possible workaround was to make **multiple requests for each year**, but this approach was inefficient and not clean.
- - Instead of showing long-term trends (due to API limitations), the app displays **Top 8 provinces** for each selected country.
- The **bar chart** compares:
  - Confirmed cases
  - Deaths
  - Recovered cases
- This gives a quick overview of how different regions within a country are impacted.
- Additionally, the API often returns **only the latest recorded data**, and doesn't provide data for a given date if it isn't available, which may cause **inaccuracies in displaying overall stats**.
- **Future improvement**: Add a **date selector** in the UI and update queries accordingly to allow users to view data for a specific date range or day.
---

## Getting Started

### Prerequisites
- **Node.js** (version 20 or higher)
- **npm** (version 10 or higher)

## Installation
1. Clone the repository:
   ```bash
   https://github.com/pbohora/covid19.metrics.git
   ```
2. Navigate to app directory:
```bash
   cd covid19.metrics
   ```

## Starting the Application Locally

1. Install packages:
```bash
    npm install
   ```
2. Start app:
```bash
   npm run dev
   ```
3. Visit:
http://localhost:5173/

## Running Tests
```bash
   npm run test
   ```

## Other useful commands
1. Lint:
```bash
   npm run lint
   ```
2. Fix lint:
```bash
   npm run lint:fix
   ```
   
