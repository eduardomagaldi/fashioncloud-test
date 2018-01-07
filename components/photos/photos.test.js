import mainHelper from '../main/js/main.helper';

const name = 'photos',
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

	it('should request ' + name + ' data by tag and page', (done) => {
		angular.mock.module(moduleName);
		angular.mock.inject([
			'$injector',
			name + 'DataService',
			function($injector, photosDataService) {
				chai.expect(photosDataService).to.be.a('object');
				chai.expect(photosDataService.getAll).to.be.a('function');

				const $httpBackend = $injector.get('$httpBackend');

				let url = [
						'https://api.flickr.com/services/rest/',
						'?method=flickr.photos.search',
						'&api_key=84a09d680272ffb49a9a9583e09807c9',
						'&tags=elephant',
						'&sort=interestingness-desc',
						'&format=json',
						'&per_page=10',
						'&page=1',
					],
					dataPromise;

				url = url.join('');

				$httpBackend.when('GET', url)
					.respond('jsonFlickrApi({})');

				$httpBackend.expectGET(url);

				dataPromise = photosDataService.getAll('elephant', 'anyuser', 1);

				dataPromise.then((data) => {
					chai.expect(data).to.be.a('object');
					done();
				});

				$httpBackend.flush();
			}
		]);
	});
});