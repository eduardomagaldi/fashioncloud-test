import mainHelper from '../main/js/main.helper';
import statesHelper from '../main/js/states.helper';

const name = 'photos',
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
		photos: '<'
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
		url: '/photos/{tag}/{userId}/{pageNum}',
		resolve: {
			photos: [
				'photosDataService',
				'$stateParams',
				function resolve(photosDataService, $stateParams) {
					return photosDataService.getAll($stateParams.tag, $stateParams.userId, $stateParams.pageNum);
				}
			]
		}
	});
}
