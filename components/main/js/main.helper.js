import statesHelper from './states.helper';

module.exports = {
	setModule: (options) => {
		const dependencies = options.dependencies || ['ui.router'];

		angular.module(
			options.moduleName,
			dependencies
		);
	},

	setComponent: (options) => {
		let resultOptions = {};

		if (options.controller) {
			resultOptions.controller = options.controller;
			resultOptions.controllerAs = 'vm';
		}

		resultOptions = {
			...resultOptions,
			...options
		};

		angular.module(options.moduleName)
			.component(options.name, resultOptions);
	},

	setAllComponents: function(componentList) {
		var that = this;

		componentList.forEach(function(componentOptions) {
			that.setComponent(componentOptions);
		});
	},

	setConfig: (options) => {
		const configFunction = options.config || config;

		angular.module(options.moduleName)
			.config(configFunction);

		config.$inject = ['$stateProvider'];
		function config($stateProvider) {
			statesHelper.setState($stateProvider, {
				name: options.name
			});
		}
	}
};