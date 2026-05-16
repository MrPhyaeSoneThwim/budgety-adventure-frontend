# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (http://localhost:3000)
npm run build      # Production build
npm test           # Run tests (Jest via react-scripts)
npm test -- --testPathPattern=App  # Run a single test file
```

## Architecture

This is a **Create React App** (react-scripts 4) project: React 17, Redux + redux-thunk, MUI v5, react-router-dom v6.

### Dual desktop/mobile component trees

The most important architectural pattern: there are two separate view trees under `src/desktop/` and `src/mobile/`. The router in `src/routes/index.jsx` checks `isMdDown` (MUI `md` breakpoint) and redirects between them at runtime. Each feature (wallets, dashboard, account, etc.) has a parallel implementation in both trees. When adding or changing a feature, you typically need to update both.

### State management

Redux store (`src/store/`) has five slices combined in `src/store/index.jsx`:

| Key | Reducer | Covers |
|---|---|---|
| `theme` | themeReducer | `themeMode` (dark/light), `lang` |
| `userState` | userReducer | auth token, user profile, OTP flow |
| `transState` | transReducers | transactions |
| `walletState` | walletReducer | wallets |
| `categoryState` | categoryReducer | categories |

Actions follow the pattern: `*_REQUEST` → `*_SUCCESS` / `*_FAIL`, plus reset helpers (e.g. `RESET_ERROR`, `RESET_SUCCESS`).

### API layer

Single Axios instance at `src/http/index.jsx` with base URL `https://budgety-api.herokuapp.com/api`. Authenticated requests pass the token via `getAuthConfig(token)` as a second/third argument to Axios calls. The token is read from `getState().userState.token` inside thunks.

### Auth flow

Signup → OTP email verification → login. JWT stored in `localStorage` under key `"token"`. `App.js` decodes the JWT on mount and sets a `setTimeout` to dispatch `setExpired()` when it expires.

### Layout structure

- **Desktop**: `src/common/layout.jsx` wraps pages with a `SideBar` (`src/common/sideBar/`)
- **Mobile**: pages use `AppBar`/`BackAppBar` from `src/common/` and `BottomNav` (`src/common/bottomNav/`)
- **Shared UI primitives**: `src/shared/` — avatarPicker, colorPicker, confirm dialog, dateButton, numberFormat, scrollBar, selectIcon, tabButton, themeSwitch

### Internationalisation

Two locales: English (`en`) and Myanmar (`mm`) in `src/i18n/locales/`. Language is stored in Redux `theme.lang` and synced to i18next in `App.js`.

### Charts

ApexCharts via `react-apexcharts`. Base styles injected globally via `src/chart/basicChartStyle.jsx`; chart option builders live in `src/chart/chartOptions.jsx`.

## Code style

Prettier config (`.prettierrc`): `semi: true`, `arrowParens: always`, `printWidth: 100`, double quotes.
