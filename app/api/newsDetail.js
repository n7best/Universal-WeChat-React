import configureStore from '../configureStore';
import * as NewsDetailActions from '../actions/newsDetail';

const newsDetailApi = (req, res) =>{
    //redux
    const store = configureStore();

    store.subscribe(()=>{
      let state = store.getState();

      if(state.newsDetail.readyState == NewsDetailActions.NEWSDETAIL_FETCHED){
        //console.log(state.news.features);
        res.json(state.newsDetail.detail);
      }
    });
    store.dispatch(NewsDetailActions.fetchNewsDetailIfNeeded(req.params.id));
};

module.exports = newsDetailApi;