import mainHelper from '../main/js/main.helper';
import statesHelper from '../main/js/states.helper';

const name = 'home',
	template = require('./' + name + '.html'),
	controller = require('./' + name + '.controller'),
	moduleName = 'app';

require('./' + name + '.styl');

require('./' + name + '.data.service');

mainHelper.setComponent({
	name,
	template,
	controller,
	moduleName,
	bindings: {
		animals: '<'
	}
});

module.exports = moduleName;

config.$inject = ['$stateProvider'];
function config($stateProvider) {
	statesHelper.setState($stateProvider, {
		name,
		resolve: {
			animals: ['animalsDataService', function(animalsDataService) {
				return animalsDataService.getAll();
			}]
		}
	});
}