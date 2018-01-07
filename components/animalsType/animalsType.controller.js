module.exports = controller;

controller.$inject = ['$stateParams', 'animalsTypeDataService'];
function controller($stateParams, animalsTypeDataService) {
	const vm = this;

	vm.title = 'Animals type:';
	vm.animalType = $stateParams.animalType;

	vm.loadImage = loadImage;

	////////////

	function loadImage(animal) {
		animalsTypeDataService.getAnimalImage(animal, function(src) {
			vm.src = src;
		});
	}
}