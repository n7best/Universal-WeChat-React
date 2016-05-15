export const NEWS_INVALID = 'NEWS_INVALID';
export const NEWS_FETCHING = 'NEWS_FETCHING';
export const NEWS_FETCHED = 'NEWS_FETCHED';
export const NEWS_FETCH_FAILED = 'NEWS_FETCH_FAILED';

function fetchNews() {
	return (dispatch) => {
		dispatch({ type: NEWS_FETCHING });

		let url = typeof document !== 'undefined' ? '/api/news' : 'http://news-at.zhihu.com/api/4/news/latest';
		return fetch(url,{
		    method: 'GET',
		})
			.then((response) => {
				return response.json();
			})
			.then(
				(result) => {
				    dispatch({ type: NEWS_FETCHED, features: result['top_stories'], stories: result['stories'], date: result['date'] })
				},
				(error) => {
				    dispatch({ type: NEWS_FETCH_FAILED, error })
				}
			);
	}
}

function shouldFetchNews(state) {
	const news = state.news;

	if (!news.features ||
	    !news.stories ||
		news.readyState === NEWS_FETCH_FAILED ||
		news.readyState === NEWS_INVALID) {
		return true;
	}

	return false;
}

export function fetchNewsIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchNews(getState())) {
			return dispatch(fetchNews());
		}
	}
}