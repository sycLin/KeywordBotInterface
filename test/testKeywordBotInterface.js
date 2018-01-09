
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
		test.expect(15);

		// Test initialization
		test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 0);
		
		// Test load() without replace
		this.keywordBot.load({"k1": "r1"}, false, function(err, res) {
			test.equal(err, null);
			test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 1);
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
		});
		
		// Test removeKeyword()
		this.keywordBot.removeKeyword("k2", null, function(err, res) {
			test.equal(err, null);
			test.equal(Object.keys(self.keywordBot.map_keyword_to_response).length, 1);
			test.ok("k3" in self.keywordBot.map_keyword_to_response);
		});
		
		// Test getResponse()
		this.keywordBot.getResponse("k3", function(err, res) {
			test.equal(err, null);
			test.equal(res, "r3");
		});
		test.done();
	}
};
