export default {
	greeting: 'Hello, this app is running with default settings',
 	url: 'http://react-template-n7best.c9users.io/',
	wechat: {
		token: '',
	        appid: '',
	        appsecret: '',
	        encodingAESKey: '',
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
