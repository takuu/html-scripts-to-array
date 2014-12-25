var assert = require("assert");
var extractor = require('../index');

describe('Extractor', function() {
	describe('reading a file', function() {
		it('should read the file and not return an error', function() {

			var test = extractor('test/mockData/index1.html');
		});
		it('should read the file and return an array of javascript files', function() {});
		it('should return empty array when no source javascript files are found', function() {});

	});
});