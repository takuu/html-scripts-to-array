#html-scripts-to-array

JavaScript implementation to extract HTML script src links to a JSON file.

## Install

```bash
$ npm install html-scripts-to-array
```

##Example

```js
var convert = require("html-scripts-to-array");

var files = convert.extract('index.html');
console.log(files);
//['file1.js', file2.js', 'file3.js']

convert.extractJSON('index.html', 'arrayOutput.json');
// creates file 'arrayOutput.json' with ['file1.js', file2.js', 'file3.js']
```
