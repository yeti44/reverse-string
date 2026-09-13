# reverse-string

A small web app and HTTP API that reverses strings. It uses Unicode
grapheme-cluster segmentation, so emoji and combined accents are reversed as
whole characters instead of being torn apart.

## Requirements

- Node.js >= 20 (developed on Node 22)
- npm

## Getting started

```bash
npm ci          # install dependencies
npm run dev     # start the dev server (with reload) on http://localhost:3000
```

Then open http://localhost:3000 and reverse some text.

## Scripts

| Command             | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Run the server with live reload (via `tsx watch`).   |
| `npm run build`     | Type-check and compile TypeScript to `dist/`.        |
| `npm start`         | Run the compiled server from `dist/`.                |
| `npm run typecheck` | Type-check without emitting output.                  |
| `npm run lint`      | Lint the source with ESLint.                         |
| `npm test`          | Run the unit and API tests with Vitest.              |

## API

- `GET /api/health` → `{ "status": "ok" }`
- `GET /api/reverse?text=hello` → `{ "input": "hello", "reversed": "olleh" }`
- `POST /api/reverse` with JSON body `{ "text": "hello" }` → same shape as above

## Project layout

```
src/reverse.ts   Core string-reversal logic (Unicode aware)
src/server.ts    Express server + JSON API + static file serving
public/          Frontend (HTML, CSS, JS)
test/            Vitest unit and API tests
```
