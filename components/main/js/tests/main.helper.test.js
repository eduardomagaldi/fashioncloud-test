import mainHelper from '../main.helper';

describe('mainHelper', function() {
	describe('setModule', function() {
		it('should create module correctly', function() {
			const spyModule = sinon.spy(angular, 'module');

			mainHelper.setModule({moduleName: 'mn'});

			chai.assert(
				spyModule.calledWithExactly(
					'mn',
					['ui.router']
				)
			);

			angular.module.restore();
		});
	});

	describe('setComponent', function() {
		it('should create component correctly', function() {
			const spyComponent = sinon.spy(angular.module('mn'), 'component');

			mainHelper.setComponent({
				name: 'compName',
				moduleName: 'mn',
				template: 't',
				controller: 'c'
			});

			chai.assert(
				spyComponent.calledWithExactly(
					'compName',
					{
						controller: 'c',
						controllerAs: 'vm',
						name: 'compName',
						moduleName: 'mn',
						template: 't'
					}
				)
			);

			angular.module('mn').component.restore();
		});
	});

	describe('setConfig', function() {
		it('should run config correctly with default function', function() {
			const spyConfig = sinon.spy(angular.module('mn'), 'config');
			let args;

			mainHelper.setConfig({
				moduleName: 'mn'
			});

			chai.expect(spyConfig.calledOnce).to.equal(true);

			args = spyConfig.firstCall.args[0];

			chai.expect(args).to.be.a('function');

			angular.module('mn').config.restore();
		});

		it('should run config correctly with passed function', function() {
			let spyConfig2;
			const func = function() {};

			mainHelper.setModule({moduleName: 'mn2'});

			spyConfig2 = sinon.spy(angular.module('mn2'), 'config');

			mainHelper.setConfig({
				moduleName: 'mn2',
				config: func
			});

			chai.assert(spyConfig2.calledOnce);
			chai.assert(
				spyConfig2.calledWithExactly(func)
			);

			angular.module('mn2').config.restore();
		});
	});
});