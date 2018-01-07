const componentName = 'animals';

angular
	.module('app.' + componentName)
	.factory(
		componentName + 'DataService',
		[
			'$http',
			service
		]
	);

function service($http) {
	return {
		getAll: function() {
			return $http.get('data/animals.json', { cache: true })
				.then(function(resp) {
					return resp.data;
				});
		}
	};
}