

module.exports = function() {
	
	// constants
	let ERROR = {
		'KEYWORD_NOT_FOUND': 404,
		'KEYWORD_DUPLICATE': 400,
		'BAD_ARGUMENTS': 406,
		'UNKNOWN': -1
	};
	this.error = ERROR;

	// variables
	this.map_keyword_to_response = {};

	// methods
	var self = this;

	this.addKeyword = (key, res, callback) => {
		if(key in self.map_keyword_to_response) {
			if(callback) {
				callback({
					'code': self.error.KEYWORD_DUPLICATE,
					'msg': 'key already existed: ' + key
				});
			}
		}
		self.map_keyword_to_response[key] = res;
		if(callback)
			callback(null);
	};

	this.removeKeyword = (key, res, callback) => {
		if(! key in self.map_keyword_to_response) {
			if(callback) {
				callback({
					'code': self.error.KEYWORD_NOT_FOUND,
					'msg': 'key not found: ' + key
				});
			}
		}
		delete self.map_keyword_to_response[key];
		if(callback)
			callback(null);
	};

	this.debugPrint = (callback) => {
		if(callback)
			callback(null, self.map_keyword_to_response);
	};

	this.getResponse = (key, callback) => {
		if(key in self.map_keyword_to_response && callback)
			callback(null, self.map_keyword_to_response[key]);
		else if(callback)
			callback({
				'code': self.error.KEYWORD_NOT_FOUND,
				'msg': 'key not found: ' + key
			});
	};

	this.load = (mapping, replace = false, callback) => {
		if(typeof mapping != 'object') {
			callback({
				'code': self.error.BAD_ARGUMENTS,
				'msg': 'mapping should be object, found: ' + (typeof mapping)
			});
			return;
		}
		self._update_mapping(mapping, replace, callback);
	};

	this._update_mapping = (mapping, replace, callback) => {
		if(replace) {
			self.map_keyword_to_response = mapping;
		} else {
			for(var k in mapping)
				self.map_keyword_to_response[k] = mapping[k];
		}
		if(callback)
			callback(null);
	};

}