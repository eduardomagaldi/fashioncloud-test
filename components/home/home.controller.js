module.exports = controller;

controller.$inject = ['homeDataService', '$rootScope'];
function controller(homeDataService, $rootScope) {
	const vm = this;

	vm.tag = 'elephant';
	$rootScope.results = [];
	$rootScope.test = 'mytest';
	vm.test = 'mytest';

	vm.global = $rootScope;

	vm.submitForm = submitForm;

	/////////////

	function submitForm(valid) {
		if (valid) {
			homeDataService.getTagInfo(
				{
					tag: vm.tag,
					userId: vm.userId,
				},
				onServerSuccess,
				onServerError
			);
		}
	}

	function onServerSuccess(data) {
		const myRegexp = /jsonFlickrApi\((.*?)\)/,
			match = myRegexp.exec(data),
			serverResult = JSON.parse(match[1]);

		if (serverResult.stat === 'fail') {
			vm.serverError = serverResult;
		} else {
			const firstPhoto = serverResult.photos.photo[0];

			let result = {
				search_tag: vm.tag,
				first_photo: firstPhoto,
				formatted_uploaded_date: new Date(parseInt(firstPhoto.dateupload, 10))
			};

			if (vm.userId) {
				result.user_id = vm.userId
			}

			console.log('result', result);

			$rootScope.results.push(result);

			resetForm();

			console.log('$rootScope.results', $rootScope.results);
		}
	}

	function onServerError(resp) {
		vm.serverError = resp.data;
	}

	function resetForm() {
		vm.serverError = false;
		vm.tag = '';
		vm.userId = '';
	}
}