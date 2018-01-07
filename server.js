/* eslint-env node */

var express = require('express'),
	server = express();

server.use('/public', express.static(__dirname + '/public'));

server.listen(8080);