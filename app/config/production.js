import defaultConfig from './default';

const config = {
	greeting: 'Hello, this app is running with production settings'
};

export default Object.assign({}, defaultConfig, config);