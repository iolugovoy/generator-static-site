/**
 * Create prompts for client info
 */

'use strict';

var fs = require('fs');

var clientPrompts = function clientPrompts() {
  if (this.existingConfig) {
    return;
  }

  var cb = this.async();

  this.log('\n---- ' + 'Client'.red.underline + ' ----\n');

  var prompts = [{
    type: 'list',
    name: 'htmlOption',
    message: 'Which ' + 'HTML preprocessor'.blue + ' would you like to use?',
    choices: ['Jade', 'Nunjucks'],
    filter: function(val) {
      var filterMap = {
        'Jade': 'jade',
        'Nunjucks': 'nunjucks'
      };

      return filterMap[val];
    }
  }, {
    type: 'list',
    name: 'jsPreprocessor',
    message: 'What ' + 'JavaScript preprocessor'.blue + ' would you like to use?',
    choices: ['None', 'ES6 (Using Babel)'],
    filter: function(val) {
      var filterMap = {
        'None': 'none',
        'ES6 (Using Babel)': 'es6'
      };

      return filterMap[val];
    }
  }, {
    type: 'list',
    name: 'concatOldScripts',
    message: 'Would you like concatenate ' + 'legacy'.blue + ' scripts files?',
    choices: ['No', 'Yes'],
    filter: function(val) {
      var filterMap = {
        'No': 'no',
        'Yes': 'yes'
      };

      return filterMap[val];
    }
  }, {
    type: 'list',
    name: 'cssOption',
    message: 'What would you like to use to ' + 'write styles'.blue + '?',
    choices: ['Sass', 'Less', 'Stylus'],
    filter: function(val) {
      var filterMap = {
        'Sass': 'sass',
        'Less': 'less',
        'Stylus': 'stylus'
      };

      return filterMap[val];
    }
  }, {
    when: function(answers) {
      return answers.cssOption === 'sass';
    },
    type: 'list',
    name: 'sassSyntax',
    message: 'What ' + 'Sass syntax'.blue + ' would you like to use ?',
    choices: ['Scss', 'Sass'],
    filter: function(val) {
      var filterMap = {
        'Scss': 'scss',
        'Sass': 'sass'
      };

      return filterMap[val];
    }
  }];

	try {
		if (fs.existsSync('./package.json')) {
			prompts.push({
				type: 'list',
			    name: 'mergePackageJson',
			    message: 'Would you like save ' + 'dependencies'.blue + ' from previous package.json file?',
			    choices: ['No', 'Yes'],
			    filter: function(val) {
			      var filterMap = {
			        'No': 'no',
			        'Yes': 'yes'
			      };

			      return filterMap[val];
			    }
			});
		}
	} catch(err) {
		console.error(err)
	}

  this.prompt(prompts, function(answers) {
    this.clientPrompts = answers;

    cb();
  }.bind(this));
};

module.exports = clientPrompts;
