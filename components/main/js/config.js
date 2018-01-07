import statesHelper from './states.helper';

angular.module('app').config(config);

///////////////

config.$inject = [
	'$stateProvider',
	'$urlRouterProvider',
	'$urlMatcherFactoryProvider'
];

function config(
	$stateProvider,
	$urlRouterProvider,
	$urlMatcherFactoryProvider
) {
	$urlMatcherFactoryProvider.strictMode(false);

	statesHelper.setState($stateProvider, {
		name: 'home',
		url: ''
	});

	statesHelper.setState($stateProvider, {
		name: 'photos',
		url: '/photos',
		lazy: true
	});

	statesHelper.setState($stateProvider, {
		name: 'page404',
		url: '/404-not-found'
	});

	$stateProvider.onInvalid(($to$, $from$) => {
		console.error('onInvalid', $to$, $from$); // eslint-disable-line no-console
	});

	$urlRouterProvider.when('', '/');
	$urlRouterProvider.otherwise('/404-not-found');
}