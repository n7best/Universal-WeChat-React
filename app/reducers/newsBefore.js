import {
	NEWSBEFORE_INVALID,
	NEWSBEFORE_FETCHING,
	NEWSBEFORE_FETCHED,
	NEWSBEFORE_FETCH_FAILED
} from '../actions/newsBefore';

export default function newsBefore(state = {
	readyState: NEWSBEFORE_INVALID,
	news: null,
	currentDate: null
}, action) {
	switch (action.type) {
		case NEWSBEFORE_FETCHING:
			return Object.assign({}, state, {
				readyState: NEWSBEFORE_FETCHING
			});
		case NEWSBEFORE_FETCH_FAILED:
			return Object.assign({}, state, {
				readyState: NEWSBEFORE_FETCH_FAILED,
				error: action.error
			});
		case NEWSBEFORE_FETCHED:
			let newNews = Object.assign({}, state.news, { [action.news.date] : action.news});
			return Object.assign({}, state, {
				readyState: NEWSBEFORE_FETCHED,
				news: newNews,
				currentDate: action.news.date
			});
		default:
			return state;
	}
}