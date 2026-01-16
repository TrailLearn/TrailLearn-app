# Test Suite Documentation

## Overview

This repository uses **Playwright** for End-to-End (E2E) testing. The architecture is designed for scalability, reliability, and ease of maintenance.

## Directory Structure

```
tests/
├── e2e/                      # Test files (spec.ts)
├── support/                  # Framework infrastructure
│   ├── fixtures/             # Test fixtures & composition
│   ├── factories/            # Data factories (user, product, etc.)
│   ├── helpers/              # Shared utility functions
│   └── page-objects/         # Page Object Models (POMs)
```

## Setup & Running Tests

### Prerequisites
- Node.js (see `.nvmrc`)
- Dependencies installed: `npm install`
- Playwright browsers installed: `npx playwright install`

### Running Tests

```bash
# Run all tests (headless)
npm run test:e2e

# Run with UI mode (recommended for debugging)
npx playwright test --ui

# Run specific project (browser)
npx playwright test --project=chromium

# Run specific file
npx playwright test tests/e2e/example.spec.ts
```

## Architecture Principles

### 1. Fixture-First Design
We use Playwright fixtures (`tests/support/fixtures`) to inject dependencies into tests. This avoids global state and `beforeEach` hooks.

### 2. Data Factories
Data is created using factories (`tests/support/factories`) rather than hardcoded JSON. Factories should:
- Use `faker` for random data
- Handle API calls to create data
- **Auto-cleanup** data after tests

### 3. Locator Strategy
Prioritize user-facing attributes or stable test IDs:
1. `page.getByRole('button', { name: 'Submit' })`
2. `page.getByTestId('submit-button')`
3. Avoid brittle CSS/XPath selectors.

## CI/CD Integration

Tests run automatically on Pull Requests via GitHub Actions (or your CI provider).
- Video and Trace artifacts are retained **only on failure**.
- Reports are available in the CI artifacts.
