
var kbi = require('../index.js');

var bot = new kbi();

module.exports = {
	setUp: function(callback) {
		this.keywordBot = new kbi();
		callback();
	},
	tearDown: function(callback) {
		callback();
	},
	testKeywordBotInterface: function(test) {
		var self = this;
		test.expect(23);

		// Test initialization
		test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 0);
		
		// Test load() without replace
		this.keywordBot.load({"k1": "r1"}, false, function(err, res) {
			test.equal(err, null);
			test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 1);
		});
		this.keywordBot.load(12345, false, function(err, res) {
			test.notEqual(err, null);
			test.equal(err.code, self.keywordBot.error.BAD_ARGUMENTS);
		});
		
		// Test load() with replace
		this.keywordBot.load({"k2": "r2"}, true, function(err, res) {
			test.equal(err, null);
			test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 1);
			test.equal(Object.keys(self.keywordBot.map_keyword_to_response)[0], 'k2');
		});
		
		// Test addKeyword()
		this.keywordBot.addKeyword("k3", "r3", function(err, res) {
			test.equal(err, null);
			test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 2);
			test.ok("k2" in self.keywordBot.map_keyword_to_response);
			test.ok("k3" in self.keywordBot.map_keyword_to_response);
			self.keywordBot.addKeyword("k3", "r3-again", function(err, res) {
				test.notEqual(err, null);
				test.equal(err.code, self.keywordBot.error.KEYWORD_DUPLICATE);
			});
		});
		
		// Test removeKeyword()
		this.keywordBot.removeKeyword("k2", null, function(err, res) {
			test.equal(err, null);
			test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 1);
			test.ok("k3" in self.keywordBot.map_keyword_to_response);
			self.keywordBot.removeKeyword("k2", null, function(err, res) {
				test.notEqual(err, null);
				test.equal(err.code, self.keywordBot.error.KEYWORD_NOT_FOUND);
			});
		});
		
		// Test getResponse()
		this.keywordBot.getResponse("k3", function(err, res) {
			test.equal(err, null);
			test.equal(res, "r3");
		});
		this.keywordBot.getResponse("k2", function(err, res) {
			test.notEqual(err, null);
			test.equal(err.code, self.keywordBot.error.KEYWORD_NOT_FOUND);
		});

		test.done();
	},
	testGetMapping: function(test) {
		var self = this;
		test.expect(2);

		// Test debugPrint()
		this.keywordBot.getMapping(function(err, res) {
			test.equal(err, null);
			test.equal(JSON.stringify(res), '{}');
		});

		test.done();
	}
};
