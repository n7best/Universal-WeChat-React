import { combineReducers } from 'redux';
import news from './news';
import newsDetail from './newsDetail';
import newsBefore from './newsBefore';

export default combineReducers({
	news,
	newsDetail,
	newsBefore
});