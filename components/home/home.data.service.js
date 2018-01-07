const componentName = 'home';

angular
	.module('app')
	.factory(
		componentName + 'DataService',
		[
			'$http',
			service
		]
	);

function service($http) {
	return {
		getTagInfo: function(data, onServerSuccess, onServerError) {
			var url = [
				'https://api.flickr.com/services/rest/',
				'?method=flickr.photos.search',
				'&api_key=84a09d680272ffb49a9a9583e09807c9',
				'&tags=' + data.tag,
				'&sort=interestingness-desc',
				'&extras=date_upload%2C+date_taken%2C+owner_name%2C+views%2C+url_q',
				'&per_page=1',
				'&format=json'
			];

			if (data.userId) {
				url.push('&user_id=' + data.userId);
			}

			return $http.get(url.join(''))
				.then(function(resp) {
					console.log('resp.data', resp.data);

					if (resp.status === 200) {
						onServerSuccess(resp.data);
					} else {
						onServerError(resp.data);
					}

					return resp.data;
				});
		}
	};
}