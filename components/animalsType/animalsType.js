import mainHelper from '../main/js/main.helper';
import statesHelper from '../main/js/states.helper';

const name = 'animalsType',
	template = require('./' + name + '.html'),
	controller = require('./' + name + '.controller'),
	moduleName = 'app.' + name;

require('./' + name + '.styl');

mainHelper.setModule({
	moduleName
});

require('./' + name + '.data.service');

mainHelper.setComponent({
	name,
	template,
	controller,
	moduleName,
	bindings: {
		animalsType: '<'
	}
});

mainHelper.setConfig({
	name,
	moduleName,
	config
});

module.exports = moduleName;

config.$inject = ['$stateProvider'];
function config($stateProvider) {
	statesHelper.setState($stateProvider, {
		name,
		url: '/animals/{animalType}',
		resolve: {
			animalsType: [
				'animalsTypeDataService',
				'$stateParams',
				function resolve(animalsTypeDataService, $stateParams) {
					return animalsTypeDataService.getByType($stateParams.animalType);
				}
			]
		}
	});
}
