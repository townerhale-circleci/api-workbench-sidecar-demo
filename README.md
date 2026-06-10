# API Workbench — Chunk Sidecar Demo

A small API-client app ("API Workbench") with a Playwright E2E suite, built to demo
the **Chunk Sidecar** fast-validation loop. The suite reproduces a failure pattern
common in real desktop-app E2E suites: **one shared page-object helper with a timing
bug fails multiple unrelated specs.**

## The seeded failure

`tests/e2e/page-objects/components/auth/app-sign-in-screen.js` waits only **250ms**
for the sign-in button, but the app's splash loader takes **800–1200ms** to finish
booting. Both runtime specs sign in through that one helper, so both fail with the
same `TimeoutError`:

- `specs/runtime/socket-io-request.spec.js`
- `specs/runtime/mqtt-request-empty-state.spec.js`

The smoke spec (`specs/smoke/app-boot.spec.js`) does not sign in, so it always passes.

**The fix** (what the agent should land on): wait for the splash loader to disappear
and/or use a sane default timeout in `clickSignInButton()` — fix the *helper*, not
the specs.

## Run locally

```bash
npm install
npx playwright install --with-deps chromium
npm run test:e2e            # 2 fail (runtime), 1 passes (smoke)
npm run test:e2e:runtime    # the failing pair only — the demo validation command
```

## Demo loop (Chunk Sidecar)

```bash
chunk sidecar create --org-id <ORG_ID>
chunk sidecar sync
chunk validate e2e-runtime          # fails: 2 specs, 1 shared helper
# fix tests/e2e/page-objects/components/auth/app-sign-in-screen.js locally
chunk sidecar sync
chunk validate e2e-runtime          # green
```

Named validation commands live in `.chunk/config.json` (`e2e-runtime`, `e2e-smoke`).

## Reset after a demo

```bash
git restore tests/e2e/page-objects/components/auth/app-sign-in-screen.js
chunk sidecar sync
```
