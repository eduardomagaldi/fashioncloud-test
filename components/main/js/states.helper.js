module.exports = {
	setState: ($stateProvider, stateOptions) => {
		var defaultOptions = {
				url: '/' + stateOptions.name
			},
			resultOptions,
			stateName = stateOptions.name;

		if (stateOptions.lazy) {
			stateName += '.**';
			defaultOptions.lazyLoad = lazyLoad;
		} else {
			defaultOptions.component = stateOptions.name;
		}

		resultOptions = {
			...defaultOptions,
			...stateOptions,
			name: stateName
		};

		$stateProvider.state(resultOptions);

		lazyLoad.$inject = ['transition'];
		function lazyLoad(transition) {
			const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
			return System.import('../../' + stateOptions.name + '/' + stateOptions.name + '.js')
				.then(moduleName => {
					$ocLazyLoad.load(angular.module(moduleName));
				});
		}
	}
};