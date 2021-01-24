# Jira Server Tools

A Google Chrome extension for self-hosted Jira. Easily copy issue/ ticket ID, title and URL to clipboard.

## Built with

- [Create React App](https://create-react-app.dev/) - config override by [CRACO](https://github.com/gsoft-inc/craco)
- [Tailwind CSS](https://tailwindcss.com/)
- passion

## Development

### Updates on `package.json`

- replace `react-scripts` with `craco` - read more at [https://tailwindcss.com/docs/guides/create-react-app#install-and-configure-craco](https://tailwindcss.com/docs/guides/create-react-app#install-and-configure-craco).
- add `INLINE_RUNTIME_CHUNK=false` on `"build"` - used to bundle script on a separate file.
- add `npm run build:chrome-scripts` on `"build"` - additional command to build Chrome scripts.
- add `"build:chrome-scripts": "npx webpack -c webpack.chrome.config.js"` - custom command to build Chrome scripts.

Final `"scripts"` block on `package.json`:

```json
{
  ...
  "scripts": {
    "start": "craco start",
    "build": "INLINE_RUNTIME_CHUNK=false craco build && npm run build:chrome-scripts",
    "build:chrome-scripts": "npx webpack -c webpack.chrome.config.js",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
  ...
}
```

### Additions:

- `webpack.chrome.config.js` - used to transpile Chrome scripts.
- `src/chrome/*.js` - Chrome scripts on development; build output at `build/chrome/`.

## Maintainer

This project is developed and maintained by [@earvinpiamonte](https://twitter.com/earvinpiamonte).
