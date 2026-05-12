# A Cobbler's Inn

A React + Vite single-page site for A Cobbler's Inn, a fictional master cobbler on Jermyn Street, London (est. 1923). Animations use `motion/react`.

## Run

```bash
npm install
npm run dev
```

## AI Edit Mode

Toggle the **Edit** pill in the nav bar, click any line of copy, and rewrite it through Claude with a streaming preview.

For local dev only, create a `.env` file in this directory:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

The hook calls the Anthropic API directly from the browser using `anthropic-dangerous-direct-browser-access: true`. **Do not ship this to production with the key in the bundle** — proxy the call through your own server (e.g. a Vite middleware or a tiny Node endpoint) and remove the header.

## Stack

- React 19 + Vite
- `motion/react` for animation (the renamed `framer-motion`)
- No CSS framework — design tokens live in `src/index.css`
- All copy is keyed in `src/hooks/useEditMode.js` and rendered through the `<E>` wrapper for in-place editing
