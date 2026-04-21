# Bank App — Native JavaScript SPA

> **[Читать на русском](README.ru.md)**

A fully functional single-page banking application built **entirely with vanilla JavaScript** — no React, no Vue, no Angular. Every architectural piece (router, state management, component system, DOM library, HTTP client) is implemented from scratch, demonstrating deep mastery of core web technologies.

---

## Table of Contents

- [Overview](#overview)
- [Live Features](#live-features)
- [Architecture](#architecture)
- [Custom Core Framework](#custom-core-framework)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Design System](#design-system)
- [Contact](#contact)

---

## Overview

This project was built as a demonstration that a production-quality SPA does not require a framework. Every pattern you find in modern frontend frameworks — reactive state, component lifecycle, client-side routing, scoped styles — is implemented here in pure JavaScript.

The application simulates a real banking interface: users can authenticate, view their card and balance, top-up/withdraw funds, transfer money to other users, explore transaction history, and see income/expense analytics via a custom-drawn donut chart.

---

## Live Features

### Authentication
- User registration and login with email + password
- JWT Bearer token authentication
- Persistent session via `localStorage` — survives page refresh
- Automatic logout with full state cleanup

### Card & Balance Management
- View formatted card number (`xxxx xxxx xxxx xxxx`)
- One-click copy card number to clipboard with visual feedback
- Toggle CVC visibility (hidden by default)
- Live balance displayed in RUB with `Intl.NumberFormat` formatting

### Transactions
- Top-up account balance
- Withdraw from account balance
- Transfer money to another user by card number
- After every transaction: balance, history, and statistics all refresh automatically via custom DOM events

### Contacts & Transfers
- Searchable contact list with user avatars
- Click any contact to auto-fill their card number in the transfer form
- Prompt-based amount input with validation

### Transaction History
- Full list of all transactions, sorted newest-first
- Visual distinction between income (green) and expense (red) entries
- Human-readable date formatting

### Statistics
- Donut chart (drawn with pure CSS + JS, no canvas/SVG library)
- Real-time income vs expense percentage breakdown
- Refreshes after every transaction

### UI/UX
- Toast notification system (success / error, auto-dismiss)
- Form validation with inline error states
- Loading spinners during async operations
- Fade-in animations for dynamically rendered content
- 404 page for unknown routes

---

## Architecture

### Client-Side Router
A custom router built on the History API (`window.history.pushState`). A single click handler on `document` intercepts navigation links; routes are defined as a path → component map in `routes.data.js`. Unknown paths fall back to a 404 component automatically.

### Reactive State (Observer Pattern)
A **Singleton Store** (`Store.getInstance()`) holds the entire application state. It uses a JavaScript `Proxy` to intercept every `set` operation and notify all registered observer components. No Redux, no MobX — just the Observer pattern applied cleanly.

State is two-way synced with `localStorage`, so the user's session and card data persist across browser sessions.

### Component System
Two base classes drive the UI:
- `ScreenComponent` — page-level views (manages `document.title`, renders into `#app`)
- `ChildComponent` — reusable sub-components (card info, transactions list, donut chart, etc.)

HTML templates are stored as `.html` files and parsed by `RenderService` using `DOMParser`. Custom `<component-*>` tags are resolved and replaced with live component instances.

### Data Flow
```
User action
  → Component event handler
  → API Service (JSQuery fetch wrapper)
  → onSuccess callback
  → Store.update()
  → All observers notified → DOM re-renders
  → Toast notification shown
```

---

## Custom Core Framework

The `/core` directory contains a complete mini-framework built from scratch:

| Module | Description |
|---|---|
| `core/router/` | History API client-side router with fallback |
| `core/rquery/` | jQuery-like DOM library (chaining, events, CSS, input helpers) |
| `core/js-query/` | `fetch`-based async HTTP client with Bearer token auto-injection |
| `core/component/` | Base classes for screen and child components |
| `core/services/render.service.js` | HTML template parser and component resolver |
| `core/services/form.service.js` | Form field value extraction |
| `core/services/storage.service.js` | localStorage wrapper with JSON serialization |
| `core/services/validation.service.js` | Field validation with error display |
| `core/services/notification.service.js` | Toast notification queue |

**RQuery** (the DOM library) supports: `find`, `findAll`, `append`, `html`, `text`, `addClass`, `removeClass`, `css`, `show`, `hide`, `click`, `submit`, `on`, `value`, `attribute`, `numberInput`, `creditCardInput` — all chainable.

---

## Project Structure

```
src/
├── api/                    # Service layer — one file per API domain
│   ├── auth.service.js
│   ├── card.service.js
│   ├── transaction.service.js
│   ├── user.service.js
│   └── statistic.service.js
├── components/
│   ├── layout/             # App shell: header, logo, search, notifications
│   └── screens/            # Page components
│       ├── auth/           # Login / Register
│       ├── home/           # Dashboard
│       │   ├── card-info/
│       │   ├── actions/    # Top-up / Withdrawal
│       │   ├── transactions/
│       │   ├── statistics/ # Donut chart
│       │   └── contacts/
│       ├── about-us/
│       └── not-found/
├── core/                   # Custom framework (router, rquery, jsquery, services)
├── config/                 # URL, SEO, color constants
├── constants/              # Auth keys, event names, timeout values
├── styles/                 # Global SCSS, variables, mixins, keyframes
└── utils/format/           # Card number, date, currency formatters
```

---

## Tech Stack

| Category | Tool |
|---|---|
| Language | Vanilla JavaScript (ES6+) |
| Bundler | Webpack 5 |
| Transpiler | Babel (`@babel/preset-env`) |
| Styles | SCSS + CSS Modules |
| Linting | ESLint + Prettier (with import sort) |
| Dev Server | webpack-dev-server (port 5000, HMR) |
| Dependencies | **Zero runtime dependencies** |

---

## Getting Started

```bash
# Install dev dependencies
npm install

# Start development server (http://localhost:5000)
npm run dev

# Build for production
npm run build
```

> Requires a running backend API. Set the server URL via the `SERVER_URL` environment variable.

---

## API Integration

All API calls go through the custom `JSQuery` HTTP client. The token is injected automatically from `localStorage` if present.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in, receive token |
| GET | `/api/users?searchTerm=` | Search users |
| GET | `/api/cards/by-user` | Fetch card details |
| PATCH | `/api/cards/balance/top-up` | Deposit funds |
| PATCH | `/api/cards/balance/withdrawal` | Withdraw funds |
| PATCH | `/api/cards/transfer-money` | Transfer to another card |
| GET | `/api/transactions?orderBy=desc` | Transaction history |
| GET | `/api/statistics` | Income / expense stats |

---

## Design System

| Token | Value |
|---|---|
| Background | `#181a1e` (dark charcoal) |
| Text | `#fdfdfd` (near-white) |
| Primary | `#917cff` (purple) |
| Accent | `#08f0c8` (cyan) |
| Font | Inter (system stack fallback) |

Animations: `fade-in` (dynamic content entrance) and `drawing` (link underline reveal) — both defined as CSS keyframes.

---

## Contact

**Oleg Melekh** — oleg.melekh.frontend@gmail.com
