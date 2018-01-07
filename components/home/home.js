import mainHelper from '../main/js/main.helper';

const name = 'home',
	template = require('./' + name + '.html'),
	moduleName = 'app';

require('./' + name + '.styl');

mainHelper.setComponent({
	name,
	template,
	moduleName
});