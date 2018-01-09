# KeywordBotInterface
a node module of an easy-to-use keyword chatbot interface.

[![Build Status](https://travis-ci.org/sycLin/KeywordBotInterface.svg?branch=master)](https://travis-ci.org/sycLin/KeywordBotInterface)
[![Coverage Status](https://coveralls.io/repos/github/sycLin/KeywordBotInterface/badge.svg?branch=master&forceUpdate=true)](https://coveralls.io/github/sycLin/KeywordBotInterface?branch=master)

## Getting started

### Require this module

```javascript
var KeywordBotInterface = require('path/to/this/repo'); // please wait for me to publish this repo, haha.
var keywordBot = new KeywordBotInterface();
```

### Simple Text Response Example

In this part of the tutorial you will find it really simple to define the bot's simple text response to specific messages received.

The following four code snippets demonstrate the CRUD of simple text response behavior.

1. **C**reate keyword response

```javascript
keywordBot.addKeyword('mySampleMessage', 'mySampleResponse', function(err) {
  if(err && err.code == keywordBot.error.KEYWORD_DUPLICATE) {
    console.log('Error: the key already existed');
  } else {
    console.log('Keyword added successfully');
  }
});
```

2. **R**ead keyword response

```javascript
keywordBot.getResponse('mySampleMessage', function(err, res) {
  if(err && err.code == keywordBot.error.KEYWORD_NOT_FOUND) {
    console.log('Error: keyword not found');
  } else {
    console.log('the response is:', res);
  }
});
```

3. **U**pdate keyword response

(TODO)

4. **D**elete keyword response

```javascript
keywordBot.removeKeyword('mySampleMessage', null, function(err, res) {
  if(err && err.code == keywordBot.error.KEYWORD_NOT_FOUND) {
    console.log('Error: keyword not found');
  } else {
    console.log('Keyword deleted successfully');
  }
});
```
