import 'angular';
import '@uirouter/angularjs';
import 'angular-messages';
import 'oclazyload';

angular.module(
	'app',
	[
		'ui.router',
		'oc.lazyLoad',
		'ngMessages'
	]
);