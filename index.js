var jsdom = require("jsdom");
var fs = require('fs');
var Q = require('q');


function _readFile(file) {
	var data = fs.readFileSync(file, 'utf8');

	console.log('_readFile: ', typeof data);
	return data;

}

function _extractJSFiles(file) {
	var results = [];
	var defer = Q.defer();
	console.log('_extractJSFiles: ', typeof file);

	 //https://github.com/tmpvar/jsdom
	//TODO: this jsdom runs async.  Probably need to find another that just runs synchronously
	 jsdom.env(file, [],
	 	function (errors, window) {
	 		console.log("contents of script tags:");
			var allScripts = window.document.querySelectorAll('script');
			console.log('script count: ', allScripts.length);
			for(var i=0; i<allScripts.length; i++) {
				var item = allScripts[i].getAttribute('src');
				results.push(item);
			}
			defer.resolve(results);
	 	}
	 );
	console.log('this should show last');
	return defer.promise;
}

var htmlJSToArray = function(file) {

	var absoluteDir = __dirname +'/' + file;
	console.log('absoluteDir: ', absoluteDir);
	var data = _readFile(absoluteDir);
	_extractJSFiles(data);
};



module.exports = htmlJSToArray;
