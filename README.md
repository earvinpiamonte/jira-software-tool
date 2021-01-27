# Jira Software Tool

A Google Chrome extension for self-hosted Jira Software. Easily copy issue/ ticket ID, title and URL to clipboard.

## Usage

Select an issue/ ticket from Jira Software dashboard and click on the extension icon on the extensions area of your browser to open the popup. The popup also opens on the specific issue page.

## Built with

- [Create React App](https://create-react-app.dev/) - config override with [CRACO](https://github.com/gsoft-inc/craco)
- [Tailwind CSS](https://tailwindcss.com/)
- passion

## Add to Google Chrome from Web Store

[Add to Chrome](https://chrome.google.com/webstore/detail/jira-software-tool/nffiapablabogfkpckmgbeiocccifbed)

## Add to Google Chrome w/ developer mode

### Important notes

Even though this project works on the local development server `http://localhost:3000/`, it is still needed to run `npm run build` whenever you made changes on the source code. This is because the extension needs to function on the browser side and not on the local server.

The normal workflow are the following:

1. Make change(s) on source code.
2. Run `npm run build`.
3. Reload the extension at `chrome://extensions/` (optional).
4. Repeat (hehe XD).

### Clone the project and try it out

1. Clone

```
git clone https://github.com/earvinpiamonte/jira-software-tool.git
```

2. cd to project

```
cd jira-software-tool/
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

8. Find the project `jira-software-tool/` and open it. Select `build/` as the extension directory.

9. Jira Software Tool extension should be added to Chrome at this point.

## Development story

Documented below are the additions and updates I made to be able to run this React project on a Google Chrome browser.

### Updates on `package.json`

- Replaced `react-scripts` with `craco` - read more at [https://tailwindcss.com/docs/guides/create-react-app#install-and-configure-craco](https://tailwindcss.com/docs/guides/create-react-app#install-and-configure-craco).
- Added `INLINE_RUNTIME_CHUNK=false` on `"build"` - used to bundle script on a separate file.
- Added `npm run build:chrome-scripts` on `"build"` - additional command to build Chrome scripts.
- Added `"build:chrome-scripts": "npx webpack -c webpack.chrome.config.js"` - custom command to build Chrome scripts.

Final look of `"scripts"` block on `package.json`:

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
- `src/chrome/*.tsx` - Chrome scripts; build output at `build/chrome/`.

## Maintainer

This project is developed and maintained by [@earvinpiamonte](https://twitter.com/earvinpiamonte).
