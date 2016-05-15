import configureStore from '../configureStore';
import * as NewsActions from '../actions/news';

const configs = require('../config/default.js');
const wechat = require('wechat');

//redux
const store = configureStore();


const router =  wechat(configs.default.wechat, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  let message = req.weixin;

  //console.log('wechat:',message);
  if(message.MsgType == 'event' && message.EventKey == 'V1001_TODAY_NEWS') {
    store.subscribe(()=>{
      let state = store.getState();

      if(state.news.readyState == NewsActions.NEWS_FETCHED){

        let msg = state.news.features.map(item=>{
          return {
            title: item.title,
            description: '',
            picurl: item.image,
            url: `${configs.default.url}news/${item.id}`
          }
        })
        //console.log(state.news.features);
        res.reply(msg);
      }
    });
    store.dispatch(NewsActions.fetchNewsIfNeeded());
  }else{
    //bot auto reply api
    /* global fetch */
    fetch(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${encodeURIComponent(message.Content)}`)
      .then(response => {
        return response.json();
      })
      .then(
        result => {
          if(result.result == 0) res.reply(result.content);
          else res.reply('系统错误');
        },
        error => {
          res.reply('系统错误');
        }
      );
  }
});

module.exports = router;