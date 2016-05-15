import {
	NEWS_INVALID,
	NEWS_FETCHING,
	NEWS_FETCHED,
	NEWS_FETCH_FAILED
} from '../actions/news';

export default function news(state = {
	readyState: NEWS_INVALID,
	features: null,
	stories: null,
	date: null,
}, action) {
	switch (action.type) {
		case NEWS_FETCHING:
			return Object.assign({}, state, {
				readyState: NEWS_FETCHING
			});
		case NEWS_FETCH_FAILED:
			return Object.assign({}, state, {
				readyState: NEWS_FETCH_FAILED,
				error: action.error
			});
		case NEWS_FETCHED:
			return Object.assign({}, state, {
				readyState: NEWS_FETCHED,
				features: action.features,
				stories: action.stories,
				date: action.date
			});
		default:
			return state;
	}
}