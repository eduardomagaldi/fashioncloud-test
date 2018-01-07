module.exports = controller;

controller.$inject = ['homeDataService', '$rootScope'];
function controller(homeDataService, $rootScope) {
	const vm = this;

	vm.tag = 'elephant';
	vm.orderBy = 'first_photo.views';

	$rootScope.results = [];
	vm.global = $rootScope;

	vm.submitForm = submitForm;
	vm.setOrderBy = setOrderBy;

	// var myObj = {
	// 	one: {id: 1, name: 'Some thing'},
	// 	two: {id: 2, name: 'Another thing'},
	// 	three: {id: 3, name: 'A third thing'}
	// };

	// vm.resultTest = [
	// 	{"search_tag":"zebra","first_photo":{"id":"27740455439","owner":"69868933@N07","secret":"1968d25dba","server":"4728","farm":5,"title":"Asiatic Elephants","ispublic":1,"isfriend":0,"isfamily":0,"dateupload":"1515158369","datetaken":"2017-10-07 13:52:33","datetakengranularity":"0","datetakenunknown":"0","ownername":"K.Verhulst","views":"334","url_q":"https://farm5.staticflickr.com/4728/27740455439_1968d25dba_q.jpg","height_q":"150","width_q":"150"},"formatted_uploaded_date":"1970-01-18T12:52:38.369Z"},
	// 	{"search_tag":"elephant","first_photo":{"id":"27740455439","owner":"69868933@N07","secret":"1968d25dba","server":"4728","farm":5,"title":"Asiatic Elephants","ispublic":1,"isfriend":0,"isfamily":0,"dateupload":"1515158369","datetaken":"2017-10-07 13:52:33","datetakengranularity":"0","datetakenunknown":"0","ownername":"K.Verhulst","views":"334","url_q":"https://farm5.staticflickr.com/4728/27740455439_1968d25dba_q.jpg","height_q":"150","width_q":"150"},"formatted_uploaded_date":"1970-01-18T12:52:38.369Z"},
	// 	{"search_tag":"dog","first_photo":{"id":"39367834432","owner":"95622330@N04","secret":"8739c6f72a","server":"4732","farm":5,"title":"Taking a meat cleaver on a blind date.","ispublic":1,"isfriend":0,"isfamily":0,"dateupload":"1514682878","datetaken":"2017-12-31 09:34:35","datetakengranularity":"0","datetakenunknown":"0","ownername":"Michael Desimone","views":"3152","url_q":"https://farm5.staticflickr.com/4732/39367834432_8739c6f72a_q.jpg","height_q":"150","width_q":"150"},"formatted_uploaded_date":"1970-01-18T12:44:42.878Z"},
	// 	{"search_tag":"aaaaaa","first_photo":{"id":"39367834432","owner":"95622330@N04","secret":"8739c6f72a","server":"4732","farm":5,"title":"Taking a meat cleaver on a blind date.","ispublic":1,"isfriend":0,"isfamily":0,"dateupload":"1514682878","datetaken":"2017-12-31 09:34:35","datetakengranularity":"0","datetakenunknown":"0","ownername":"Michael Desimone","views":"3152","url_q":"https://farm5.staticflickr.com/4732/39367834432_8739c6f72a_q.jpg","height_q":"150","width_q":"150"},"formatted_uploaded_date":"1970-01-18T12:44:42.878Z"},
	// ];

	// vm.arrFromMyObj = Object.keys(myObj).map(function(key) {
	// 	return myObj[key];
	// });

	// console.log('vm.arrFromMyObj', vm.arrFromMyObj);




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

			if (!firstPhoto) {
				vm.serverError = 'Nothing found.';
				return;
			}

			let result = {
				search_tag: vm.tag,
				first_photo: firstPhoto,
				formatted_uploaded_date: new Date(parseInt(firstPhoto.dateupload, 10))
			};

			if (vm.userId) {
				result.user_id = vm.userId;
			}

			result.first_photo.views = parseInt(result.first_photo.views, 10);

			// console.log('result.first_photo.views', result.first_photo.views);

			$rootScope.results.push(result);

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