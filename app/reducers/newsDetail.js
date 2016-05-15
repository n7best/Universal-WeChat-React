import {
	NEWSDETAIL_INVALID,
	NEWSDETAIL_FETCHING,
	NEWSDETAIL_FETCHED,
	NEWSDETAIL_FETCH_FAILED
} from '../actions/newsDetail';

export default function newsDetail(state = {
	readyState: NEWSDETAIL_INVALID,
	detail: null,
}, action) {
	switch (action.type) {
		case NEWSDETAIL_FETCHING:
			return Object.assign({}, state, {
				readyState: NEWSDETAIL_FETCHING
			});
		case NEWSDETAIL_FETCH_FAILED:
			return Object.assign({}, state, {
				readyState: NEWSDETAIL_FETCH_FAILED,
				error: action.error
			});
		case NEWSDETAIL_FETCHED:
			return Object.assign({}, state, {
				readyState: NEWSDETAIL_FETCHED,
				detail: action.detail
			});
		default:
			return state;
	}
}