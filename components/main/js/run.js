import './run.service';

angular.module('app').run(run);

///////////////

run.$inject = ['runService'];
function run(runService) {
	runService();
}