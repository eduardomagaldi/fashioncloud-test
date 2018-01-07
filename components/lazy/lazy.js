import mainHelper from '../main/js/main.helper';

const name = 'lazy',
	template = require('./' + name + '.html'),
	controller = require('./' + name + '.controller'),
	moduleName = 'app.' + name;

require('./' + name + '.styl');

mainHelper.setModule({
	moduleName
});

mainHelper.setComponent({
	name,
	template,
	controller,
	moduleName
});

mainHelper.setConfig({
	name,
	moduleName
});

module.exports = moduleName;