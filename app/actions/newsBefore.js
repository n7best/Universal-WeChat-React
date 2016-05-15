export const NEWSBEFORE_INVALID = 'NEWSBEFORE_INVALID';
export const NEWSBEFORE_FETCHING = 'NEWSBEFORE_FETCHING';
export const NEWSBEFORE_FETCHED = 'NEWSBEFORE_FETCHED';
export const NEWSBEFORE_FETCH_FAILED = 'NEWSBEFORE_FETCH_FAILED';

function fetchNewsBefore(news_date) {
	return (dispatch) => {
		dispatch({ type: NEWSBEFORE_FETCHING });
		let url = typeof document !== 'undefined' ? `/api/news/before/${news_date}` : `http://news.at.zhihu.com/api/4/news/before/${news_date}`;
		return fetch(url,{
		    method: 'GET',
		})
			.then((response) => {
				return response.json();
			})
			.then(
				(result) => {
				    dispatch({ type: NEWSBEFORE_FETCHED, news: result })
				},
				(error) => {
				    dispatch({ type: NEWSBEFORE_FETCH_FAILED, error })
				}
			);
	}
}

function shouldFetchNewsBefore(state, news_date) {
	const news = state.news;

	if (!news[news_date] ||
		news.readyState === NEWSBEFORE_FETCH_FAILED ||
		news.readyState === NEWSBEFORE_INVALID) {
		return true;
	}

	return false;
}

export function fetchNewsBeforeIfNeeded(news_date) {
	return (dispatch, getState) => {
		if (shouldFetchNewsBefore(getState(), news_date)) {
			return dispatch(fetchNewsBefore(news_date));
		}
	}
}