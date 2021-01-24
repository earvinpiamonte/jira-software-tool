# Jira Server Tools

A Google Chrome extension for self-hosted Jira. Easily copy issue/ ticket ID, title and URL to clipboard.

## Built with

- [Create React App](https://create-react-app.dev/) - config override with [CRACO](https://github.com/gsoft-inc/craco)
- [Tailwind CSS](https://tailwindcss.com/)
- passion

## Get on Chrome Web Store

[Add to Chrome](https://chrome.google.com/webstore/detail/jira-server-tools/nffiapablabogfkpckmgbeiocccifbed)

## Add to Google Chrome w/ developer mode

1. Clone

```
git clone https://github.com/earvinpiamonte/jira-server-tools.git
```

2. cd to project

```
cd jira-server-tools/
```

3. Install dependencies

```
npm i
```

4. Build project

```
npm run build
```

5. Open a Google Chrome browser and navigate to `chrome://extensions/`.

6. Enable `Developer mode`.

7. Click on `Load unpacked`.

8. Find the project `jira-server-tools/` and open it. Select `build/` as the extension directory

9. Jira Server Tools extension should be added to Chrome at this point.

## Development

Documented below are the additions and updates I made to be able to run this React project on a Google Chrome browser.

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
