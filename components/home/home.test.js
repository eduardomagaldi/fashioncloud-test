const name = 'home',
	template = require('./' + name + '.html');

describe(name + ' component', () => {
	it('should have valid template', () => {
		chai.assert(template);
	});
});