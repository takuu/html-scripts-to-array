#html-scripts-to-array

JavaScript implementation to extract HTML script src links to a JSON file.

## Install

```bash
$ npm install html-scripts-to-array
```

##Example

```js
var convert = require("html-scripts-to-array").extract;

convert('index.html', 'arrayOutput.json');
```

- updated to use cheerio instead of jsdom because we want to have our script to be synchronous instead of asynchronous
- added some tests
- updated README.md to be more helpful
