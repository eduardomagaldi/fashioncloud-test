module.exports = controller;

controller.$inject = ['homeDataService', '$rootScope'];
function controller(homeDataService, $rootScope) {
	const vm = this;

	vm.orderBy = 'first_photo.views';

	$rootScope.results = [];
	vm.global = $rootScope;

	vm.submitForm = submitForm;
	vm.setOrderBy = setOrderBy;
	vm.resetForm = resetForm;

	/////////////

	function submitForm(valid) {
		if (valid) {
			vm.loading = true;

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

			if (!firstPhoto) {
				vm.serverError = 'Nothing found.';
				return;
			}

			let result = {
				search_tag: vm.tag,
				first_photo: firstPhoto
			};

			if (vm.userId) {
				result.user_id = vm.userId;
			}

			result.first_photo.views = parseInt(result.first_photo.views, 10);

			$rootScope.results.push(result);

			vm.loading = false;

			resetForm();
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

	function setOrderBy(value) {
		vm.orderBy = value;
	}
}