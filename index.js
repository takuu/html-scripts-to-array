var cheerio = require('cheerio');
var fs = require('fs');


module.exports = {

	extractJS: function extract(inputFile, outputFile) {
		var data = this._readFile(__dirname +'/' + inputFile);
		var arrayJS = this._extractJSFiles(data);
		this._writeToJSON(arrayJS, outputFile);
	},

	// Below are internal functions but are exposed for testing
	_readFile: function _readFile(file) {
		var data;

		console.log('reading file ' + file + ' ..');

		try {
			data = fs.readFileSync(file, 'utf8');
		} catch(err) {
			console.log('there was an error reading that file', err);
		}

		return data;
	},

	_extractJSFiles: function _extractJSFiles(file) {
		var results = [];

		$ = cheerio.load(file);

		var scripts = $('script').each(function() {
			var src = $(this).attr('src');
			if (src) results.push(src);
		});

		console.log('file has ', scripts.length, 'script src files');
		return results;
	},

	_writeToJSON: function _writeToJSON(array, file) {
		try {
			fs.writeFileSync(file, JSON.stringify(array), 'utf8');
		} catch (err) {
			console.log('There was an error writing to JSON', err);
		}
	}

};