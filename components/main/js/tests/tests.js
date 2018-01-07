/* eslint angular/window-service: 0 */

import '../vendor';

require('mocha/mocha.css');

import 'mocha';

import chai from 'chai';
import sinon from 'sinon';

window.sinon = sinon;
window.chai = chai;

mocha.setup({
	'ui': 'bdd',
	'reporter': 'html'
});

require('angular-mocks');

require('./main.test');

require('./states.helper.test');
require('./main.helper.test');

require('../../../home/home.test');
require('../../../lazy/lazy.test');
require('../../../page404/page404.test');
require('../../../animals/animals.test');
require('../../../animalsType/animalsType.test');

mocha.run();