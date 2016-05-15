import MobileDetect from 'mobile-detect';

const sdkUrl = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';

const isWechat = () => {
    if(typeof document !== 'undefined'){
		let md = new MobileDetect(window.navigator.userAgent);
		return md.match('MicroMessenger');
    }
    return false;
}

//from jquery
const getScript = (src, callback) => {
  var s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.onreadystatechange = s.onload = function() {
    if (!callback.done && (!s.readyState || /loaded|complete/.test(s.readyState))) {
      callback.done = true;
      callback();
    }
  };
  document.querySelector('head').appendChild(s);
}

const loadSDK = (cb) => {
    if(isWechat()){
        getScript(sdkUrl, ()=>{
    		/*global wx*/
    		wx.config(window.__WC_CONFIGS__);

    		wx.ready(function(){
                cb();
    		});

    		wx.error(function(res){
    			console.log(res);
    		});
    	});
    }
}

export { isWechat, getScript, sdkUrl, loadSDK };