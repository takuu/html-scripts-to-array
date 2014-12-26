var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

function _getCallerFile() {
	try {
		var err = new Error();
		var callerfile;
		var currentfile;

		Error.prepareStackTrace = function (err, stack) { return stack; };

		currentfile = err.stack.shift().getFileName();

		while (err.stack.length) {
			callerfile = err.stack.shift().getFileName();

			if(currentfile !== callerfile) return callerfile;
		}
	} catch (err) {}
	return undefined;
}

module.exports = {

	extract: function extract(inputFile, outputFile) {
		var dirname = path.dirname(_getCallerFile());

		var data = this._readFile(dirname +'/' + inputFile);
		return this._extractJSFiles(data);
	},
	extractToJSON: function extract(inputFile, outputFile) {
		var dirname = path.dirname(_getCallerFile());

		var data = this._readFile(dirname +'/' + inputFile);
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

		console.log('Found ' + scripts.length + ' script source files');
		return results;
	},

	_writeToJSON: function _writeToJSON(array, file) {
		try {
			fs.writeFileSync(file, JSON.stringify(array), 'utf8');
			console.log('successfully written to file');
		} catch (err) {
			console.log('There was an error creating the file', err);
		}
	}

};