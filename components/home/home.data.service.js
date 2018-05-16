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
			let url = [
				'https://api.flickr.com/services/rest/',
				'?method=flickr.photos.search',
				'&api_key=c4dbaa5493285b2a07f9b19771f46a25',
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