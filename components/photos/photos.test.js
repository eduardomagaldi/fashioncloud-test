import mainHelper from '../main/js/main.helper';

const name = 'animalsType',
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

		let args = spy.firstCall.args,
			lastIndex = args[1].length - 1;

		chai.assert(args[0] === name + 'DataService');

		chai.expect(args[1]).to.be.a('array');
		chai.expect(args[1][lastIndex]).to.be.a('function');

		angular.module(moduleName).factory.restore();
	});

	it('should request ' + name + ' data by type', (done) => {
		angular.mock.module(moduleName);
		angular.mock.inject([
			'$injector',
			name + 'DataService',
			function($injector, animalsTypeDataService) {
				chai.expect(animalsTypeDataService).to.be.a('object');
				chai.expect(animalsTypeDataService.getByType).to.be.a('function');

				const $httpBackend = $injector.get('$httpBackend');

				$httpBackend.when('GET', 'data/animals.json')
					.respond([{
						type: 'Reptile'
					}]);

				$httpBackend.expectGET('data/animals.json');

				let animalsType = animalsTypeDataService.getByType('Reptile');

				animalsType.then((data) => {
					chai.expect(data).to.be.a('object');
					done();
				});

				$httpBackend.flush();
			}
		]);
	});

	it('should request ' + name + ' image data', (done) => {
		angular.mock.module(moduleName);
		angular.mock.inject([
			'$injector',
			name + 'DataService',
			function($injector, animalsTypeDataService) {
				chai.expect(animalsTypeDataService).to.be.a('object');
				chai.expect(animalsTypeDataService.getAnimalImage).to.be.a('function');

				const $httpBackend = $injector.get('$httpBackend');

				$httpBackend.when('GET', 'data/image.json')
					.respond({media: 'mediaURL'});

				$httpBackend.expectGET('data/image.json');

				let callbackMockFunction = sinon.spy(),
					animalsType = animalsTypeDataService.getAnimalImage('Reptile', callbackMockFunction);

				animalsType.then((data) => {
					chai.expect(data).to.be.a('object');
					chai.expect(callbackMockFunction.firstCall.args[0]).to.be.a('string');
					done();
				});

				$httpBackend.flush();
			}
		]);
	});
});