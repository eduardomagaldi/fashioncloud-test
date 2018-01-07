import mainHelper from '../main/js/main.helper';

const name = 'animals',
	template = require('./' + name + '.html'),
	controller = require('./' + name + '.controller'),
	moduleName = 'app.' + name;

describe(name + ' component', () => {
	it('should have valid template', () => {
		chai.assert(template);
	});

	it('should have valid controller', () => {
		chai.assert(controller);
		chai.expect(controller).to.be.a('function');
	});

	it('should set ' + name + 'DataService', () => {
		mainHelper.setModule({
			moduleName
		});

		const spy = sinon.spy(angular.module(moduleName), 'factory');

		require('./' + name + '.data.service');

		const args = spy.firstCall.args,
			lastIndex = args[1].length - 1;

		chai.assert(args[0] === name + 'DataService');

		chai.expect(args[1]).to.be.a('array');
		chai.expect(args[1][lastIndex]).to.be.a('function');

		angular.module(moduleName).factory.restore();
	});

	it('should request ' + name + ' data', (done) => {
		angular.mock.module(moduleName);
		angular.mock.inject([
			'$injector',
			name + 'DataService',
			function($injector, animalsDataService) {
				chai.expect(animalsDataService).to.be.a('object');
				chai.expect(animalsDataService.getAll).to.be.a('function');

				const $httpBackend = $injector.get('$httpBackend');

				$httpBackend.when('GET', 'data/animals.json')
					.respond([{}]);

				$httpBackend.expectGET('data/animals.json');

				let animals = animalsDataService.getAll();

				animals.then((data) => {
					chai.expect(data).to.be.a('array');

					done();

					$httpBackend.verifyNoOutstandingExpectation();
					$httpBackend.verifyNoOutstandingRequest();
					$httpBackend.resetExpectations();
				});

				$httpBackend.flush();
			}
		])
	});
});