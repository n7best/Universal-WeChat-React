export default {
	greeting: 'Hello, this app is running with default settings',
 url: 'http://react-template-n7best.c9users.io/',
	wechat: {
	    token: 'd4624c36b6795d1d99dcf0547af5443d',
        appid: 'wx76f7aa416aaa1b54',
        appsecret: 'd4624c36b6795d1d99dcf0547af5443d',
        encodingAESKey: '9Yf1bIuEHNpT7XqccC3LL0qFgC2xFFOYliSPbuQu7tX',
        updateMenu: false,
        sdkPermission: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        menu: {
         'button':[
           {
             'type':'click',
             'name':'今日头条',
             'key':'V1001_TODAY_NEWS'
           },
           {
             'type':'view',
             'name':'日报中心',
             'url':'http://react-template-n7best.c9users.io/'
           },
         ]
        }
	}
};