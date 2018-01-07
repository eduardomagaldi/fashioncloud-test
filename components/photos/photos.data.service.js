const componentName = 'photos';

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
		getAll: function(tag, userId) {
			var url = [
				'https://api.flickr.com/services/rest/',
				'?method=flickr.photos.search',
				'&api_key=84a09d680272ffb49a9a9583e09807c9',
				'&tags=' + tag,
				'&sort=interestingness-desc',
				// '&extras=date_upload%2C+date_taken%2C+owner_name%2C+views%2C+url_q',
				'&per_page=10',
				'&format=json'
			];

			if (userId) {
				url.push('&user_id=69868933%40N07');
			}

			return $http.get(url.join(''))
				.then(function(resp) {
					let serverResult = resp.data.split('');
					serverResult.pop(); //removing last )
					serverResult = serverResult.join('');
					serverResult = serverResult.replace('jsonFlickrApi(', '');
					serverResult = JSON.parse(serverResult);

					return serverResult;
				});
		}
	};
}