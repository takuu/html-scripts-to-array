var assert = require("assert");
var expect = require("chai").expect;
var extractor = require('../index');

describe('Extractor', function() {
	describe('reading a file', function() {
		it('should read the file and not return an error', function() {
			var stringifiedFile = extractor._readFile('test/mockData/index1.html');

			expect(stringifiedFile.length).to.be.greaterThan(0);
		});
		it('should read the file and return an array of javascript files', function() {
			var stringifiedFile = extractor._readFile('test/mockData/index1.html');
			var array = extractor._extractJSFiles(stringifiedFile);

			expect(array).to.have.property('length');
			expect(array instanceof Array).to.equal(true);
			expect(array.length).to.be.greaterThan(0);

		});
	});
});