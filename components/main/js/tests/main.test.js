describe('Main module', () => {
	describe('app.js', () => {
		it('should create main module', () => {
			const spyModule = sinon.spy(angular, 'module');

			require('../app.module.js');

			chai.assert(spyModule.calledOnce);
			chai.assert(spyModule.calledWith('app'));

			angular.module.restore();
		});
	});

	describe('config.js', () => {
		it('should set main config function', () => {
			const spyConfig = sinon.spy(angular.module('app'), 'config');

			require('../config.js');

			chai.assert(spyConfig.calledOnce);

			angular.module('app').config.restore();
		});

		it('should have set at least 2 states in module', () => {
			angular.mock.module('app');

			angular.mock.inject(['$state', injectedFunction]);

			function injectedFunction($state) {
				chai.assert($state.get().length >= 2);
			}
		});
	});

	describe('run.js', () => {
		it('should set run function', () => {
			const spyRun = sinon.spy(angular.module('app'), 'run');

			require('../run.js');

			chai.assert(spyRun.calledOnce);

			angular.module('app').run.restore();
		});
	});
});