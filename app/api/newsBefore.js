import configureStore from '../configureStore';
import * as NewsBeforeActions from '../actions/newsBefore';
import moment from 'moment';

const newsApi = (req, res) =>{
    //redux
    const store = configureStore();

    store.subscribe(()=>{
      let state = store.getState();

      if(state.newsBefore.readyState == NewsBeforeActions.NEWSBEFORE_FETCHED){
        let reqdate = moment(req.params.id).subtract(1, 'd').format('YYYYMMDD');

        res.json(state.newsBefore.news[reqdate]);
      }

      if(state.newsBefore.readyState == NewsBeforeActions.NEWSBEFORE_FETCH_FAILED){
        //console.log(state.news.features);
        res.json('failed');
      }
    });


    store.dispatch(NewsBeforeActions.fetchNewsBeforeIfNeeded(req.params.id));
};

module.exports = newsApi;