require('babel-core/register');

const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const cors = require('cors')

const port = process.env.PORT || 3000;
const server = express();
global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';

const wechatMiddleware = require('./app/wechat');
const WechatAPI = require('wechat-api');
const configs = require('./app/config/default.js');

//cors
server.use(cors());

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
	if (reason.stack) {
		console.error(reason.stack);
	} else {
		console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
	}
});

// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
server.get('/favicon.ico', function(req, res) {
	res.writeHead(200, { 'Content-Type': 'image/x-icon' });
	res.end();
});



server.use(express.static(path.resolve(__dirname, 'dist')));

if (!process.env.NODE_ENV) {
	const compiler = webpack(config);

	server.use(dev(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	}));
	server.use(hot(compiler));
}

server.use(express.query());

//init wechat api
global.wcApi = new WechatAPI(configs.default.wechat.appid, configs.default.wechat.appsecret);
if(configs.default.wechat.updateMenu){
	global.wcApi.createMenu(configs.default.wechat.menu, (err, result)=>console.log('wechat menu config: ', err, result));
}

server.use('/wechat', wechatMiddleware);

//data api
//because cors, needs server to reroute data
server.get('/api/news', require('./app/api/news.js'));
server.get('/api/news/:id', require('./app/api/newsDetail.js'));
server.get('/api/news/before/:id', require('./app/api/newsBefore.js'));
//react-redux
server.get('*', require('./app').serverMiddleware);

server.listen(port, process.env.IP , (err) => {
	if (err) {
		console.error(err);
	}
	console.info('==> 🌎 Listening on port %s. Open up http://%s:%s/ in your browser.', port ,process.env.IP, port);
});