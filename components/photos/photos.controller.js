module.exports = controller;

controller.$inject = ['$stateParams'];
function controller($stateParams) {
	const vm = this;

	vm.title = 'Animals type:';
	vm.animalType = 'bla';



	this.$onInit = function() {
		vm.photoList = vm.photos.photos.photo;

		console.log('vm.photoList', vm.photoList);
	};

	////////////
}