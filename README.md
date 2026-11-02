![ytCleaner](heading.svg)

- Browser extension that removes as many unnecessary distractions as possible from youtube. Removes garbage from various pages, i.e. recommended videos, comments, some ads, shorts.
- Built for Chromium-based web browsers, tested on Google Chrome and Brave

## Changelog
### v1.0 (10/27/26)
- Initial release
### v1.1 (11/02/26)
- Added a settings popup GUI for easier toggling of the extension (Will have more granular settings added in a future version)
- Made `content.js` more robust for future additions

## How to install
#### This is not currently published on the chrome web store or adjacent, so you must do the following:
- Create a folder and add `manifest.json` and `content.js` to it
- On your browser, go to your extension manager, i.e. `chrome://extensions` on chrome
- Enable developer mode in the top right
- Select "Load Unpacked" in the top left
- Select your folder
- Ensure the extension is enabled
 #### *Note that node.js (or any javascript interpreter) is **not** required for this
