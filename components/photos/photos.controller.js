module.exports = controller;

controller.$inject = ['$stateParams'];
function controller($stateParams) {
	const vm = this;

	vm.tag = $stateParams.tag;
	vm.userId = $stateParams.userId;
	vm.pageNum = parseInt($stateParams.pageNum, 10);

	vm.pagination = [];

	vm.$onInit = onInit;

	////////////

	function onInit() {
		vm.photoList = vm.photos.photos.photo;
		vm.lastPageNum = parseInt(vm.photos.photos.pages, 10);

		for (let i = -2; i <= 2; i++) {
			let itemNum = vm.pageNum + i;

			if (itemNum > 0 && itemNum <= vm.lastPageNum) {
				vm.pagination.push({
					itemNum,
					active: itemNum === vm.pageNum
				});
			}
		}
	}
}