# Playwright TypeScript Tests

This repository contains browser UI and API tests written in TypeScript with
[Playwright Test](https://playwright.dev/docs/intro).

## What is covered

- **SauceDemo UI**: end-to-end tests sign in as the standard user and add
  products to the cart, both from the inventory page and from product detail
  pages. The tests use page objects and a login fixture.
- **Restful-Booker API**: tests cover creating bookings, retrieving booking
  details and IDs, filtering booking IDs, and updating a booking. API clients,
  request/response models, generated booking data, and an authentication
  fixture keep API concerns separate from the specs.

The tests call the public services directly, so running them requires network
access. The API update test updates booking ID `20` on the shared
Restful-Booker service; that service's data may change independently of this
repository.

## Requirements

- Node.js (an active LTS release is used in CI)
- pnpm `12.6.0` (the package manager version declared by this project)

## Setup

From the repository root:

```sh
pnpm install
pnpm exec playwright install chromium
```

Chromium is needed for the SauceDemo browser tests. The API tests do not require
a browser, but installing Chromium lets you run the complete suite.

## Run tests

```sh
# Run all tests
pnpm test

# Run only Restful-Booker API tests
pnpm test:api

# Run only SauceDemo UI tests
pnpm test:ui

# Run API or UI tests with the browser visible (UI tests are most useful here)
pnpm test:api:headed
pnpm test:ui:headed

# List tests without executing them
pnpm test:list

# Open the most recently generated HTML report
pnpm test:report
```

Playwright writes the HTML report to `playwright-report/` and test output to
`test-results/`; both are ignored by Git. Traces are retained according to the
settings in `playwright.config.ts`.

## Project layout

```text
fixtures/
  restful-booker.fixture.ts   # API authentication fixture
  saucedemo.fixture.ts        # SauceDemo login fixture
src/
  restful_booker/
    api/clients/              # Restful-Booker API wrappers
    api/models/               # TypeScript API data models
    data/                     # Booking data generator
  sauce_demo/pages/           # UI page objects and components
tests/
  restful_booker/book/        # Booking API specs
  sauce_demo/standard_user/   # SauceDemo UI specs
playwright.config.ts          # Test projects, URLs, and execution settings
```

## Configuration and CI

`playwright.config.ts` defines two Playwright projects:

- `api` runs specs under `tests/restful_booker/` against
  `https://restful-booker.herokuapp.com`.
- `saucedemo` runs specs under `tests/sauce_demo/` in Desktop Chrome against
  `https://www.saucedemo.com/`.

No local `.env` file is required by the current tests. The SauceDemo standard
user credentials and Restful-Booker authentication credentials are currently
provided by the fixtures.

The GitHub Actions workflow in `.github/workflows/playwright.yml` installs
dependencies and Playwright browsers, runs the complete suite on pushes and
pull requests targeting `main` or `master`, and uploads the HTML report as an
artifact.
