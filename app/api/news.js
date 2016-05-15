import configureStore from '../configureStore';
import * as NewsActions from '../actions/news';

const newsApi = (req, res) =>{
    //redux
    const store = configureStore();

    store.subscribe(()=>{
      let state = store.getState();

      if(state.news.readyState == NewsActions.NEWS_FETCHED){
        //console.log(state.news.features);
        res.json({
            date: state.news.date,
            top_stories: state.news.features,
            stories: state.news.stories
        });
      }
    });
    store.dispatch(NewsActions.fetchNewsIfNeeded());
};

module.exports = newsApi;