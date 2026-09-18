# TabClipper

TabClipper is a Google Chrome extension that copies the titles and URLs of the
selected tabs to the clipboard.

After selecting one or more tabs, right-click and choose **Copy to clipboard**
from the context menu. The copied text is formatted as follows:

```text
Tab title 1
https://example.com/1

Tab title 2
https://example.com/2
```

The extension uses Manifest V3, a service worker, and an offscreen document to
write to the clipboard.

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS)
- [pnpm](https://pnpm.io/)

## Development

Install the dependencies:

```bash
pnpm install
```

Build the extension:

```bash
pnpm build
```

The production build is output to the `dist/` directory.

For development, build without minification and with source maps:

```bash
pnpm dev
```

To rebuild automatically when source files change:

```bash
pnpm watch
```

## Load the extension in Chrome

1. Run `pnpm build`.
2. Open `chrome://extensions/` in Google Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the generated `dist/` directory.
6. Select tabs, open the context menu, and choose **Copy to clipboard**.

After rebuilding, reload the unpacked extension from `chrome://extensions/`.

## Project structure

```text
├── public/
│   ├── icons/error-48x48.png   # Error notification icon
│   ├── manifest.json           # Chrome extension manifest
│   └── LICENSE                 # License copied to the build
├── src/
│   ├── extension/chrome/       # Chrome API adapters
│   ├── ports/                  # Interfaces for external services
│   ├── offscreen.html          # Offscreen document entry point
│   ├── offscreen/              # Clipboard handling
│   └── service-worker/         # Context menu and copy flow
├── tests/                      # Unit tests
├── vite.config.ts              # Extension build configuration
├── vitest.config.ts            # Test configuration
├── oxlint.config.ts            # Linter configuration
└── oxfmt.config.ts             # Formatter configuration
```

The build produces `dist/service-worker.js`, `dist/offscreen.html`, and the
static files from `public/`.

## Available scripts

- `pnpm build`: Type-check and build the production extension.
- `pnpm dev`: Build in development mode without minification and with source maps.
- `pnpm watch`: Rebuild the development bundle when files change.
- `pnpm test`: Run the test suite.
- `pnpm coverage`: Run the tests and generate a coverage report in `coverage/`.
- `pnpm lint`: Check the source code with Oxlint.
- `pnpm fmt`: Format the source code with Oxfmt.
- `pnpm fmt:check`: Check whether the source code is formatted.

## Permissions

The extension requests the following Chrome permissions:

- `contextMenus`: Add **Copy to clipboard** to the context menu.
- `tabs`: Read the title and URL of the selected tabs.
- `clipboardWrite`: Support clipboard operations.
- `offscreen`: Create an offscreen document for clipboard access.
- `notifications`: Report copy failures.

## License

This project is licensed under the [BSD 3-Clause License](./LICENSE).
