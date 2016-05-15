/* global fetch */
export const NEWSDETAIL_INVALID = 'NEWSDETAIL_INVALID';
export const NEWSDETAIL_FETCHING = 'NEWSDETAIL_FETCHING';
export const NEWSDETAIL_FETCHED = 'NEWSDETAIL_FETCHED';
export const NEWSDETAIL_FETCH_FAILED = 'NEWSDETAIL_FETCH_FAILED';

function fetchNewsDetail(newsId) {
	return (dispatch) => {
		dispatch({ type: NEWSDETAIL_FETCHING });

		let url = typeof document !== 'undefined' ? `/api/news/${newsId}` : `http://news-at.zhihu.com/api/4/news/${newsId}`;

		return fetch(url ,{
		    method: 'GET',
		})
			.then((response) => {
				return response.json();
			})
			.then(
				(result) => {
				    dispatch({ type: NEWSDETAIL_FETCHED, detail: result})
				},
				(error) => {
				    dispatch({ type: NEWSDETAIL_FETCH_FAILED, error })
				}
			);
	}
}

function shouldFetchNewsDetail(state,newsId) {
	const newsDetail = state.newsDetail;

	if (!newsDetail.detail ||
		newsDetail.detail.id !== newsId ||
		newsDetail.readyState === NEWSDETAIL_FETCH_FAILED ||
		newsDetail.readyState === NEWSDETAIL_INVALID) {
		return true;
	}

	return false;
}

export function fetchNewsDetailIfNeeded(newsId) {
	return (dispatch, getState) => {
		if (shouldFetchNewsDetail(getState(), newsId)) {
			return dispatch(fetchNewsDetail(newsId));
		}
	}
}