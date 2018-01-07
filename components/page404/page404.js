import mainHelper from '../main/js/main.helper';

const name = 'page404',
	template = require('./' + name + '.html'),
	moduleName = 'app';

require('./' + name + '.styl');

mainHelper.setComponent({
	name,
	template,
	moduleName
});