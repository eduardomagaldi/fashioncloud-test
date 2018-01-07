const name = 'home',
	template = require('./' + name + '.html'),
	controller = require('./' + name + '.controller'),
	moduleName = 'app';

describe(name + ' component', () => {
	it('should have valid template', () => {
		chai.assert(template);
	});

	it('should have valid controller', () => {
		chai.assert(controller);
		chai.expect(controller).to.be.a('function');
	});

	it('should set ' + name + 'DataService', () => {
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
			function($injector, homeDataService) {
				chai.expect(homeDataService).to.be.a('object');
				chai.expect(homeDataService.getTagInfo).to.be.a('function');

				const $httpBackend = $injector.get('$httpBackend');

				let url = [
						'https://api.flickr.com/services/rest/',
						'?method=flickr.photos.search',
						'&api_key=84a09d680272ffb49a9a9583e09807c9',
						'&tags=elephant',
						'&sort=interestingness-desc',
						'&extras=date_upload%2C+date_taken%2C+owner_name%2C+views%2C+url_q',
						'&per_page=1',
						'&format=json'
					],
					dataPromise;

				url = url.join('');

				$httpBackend.when('GET', url)
					.respond([{}]);

				$httpBackend.expectGET(url);

				dataPromise = homeDataService.getTagInfo(
					{
						tag: 'elephant'
					},
					function() {},
					function() {}
				);

				dataPromise.then((data) => {
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