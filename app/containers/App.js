import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import Helmet from 'react-helmet';

import { loadSDK } from '../wechat/utils';

class App extends Component {

	componentDidMount() {
		loadSDK(()=>{
			wx.checkJsApi({
			    jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			    success: function(res) {
			    	console.log(res)
			    }
			});
		});
	}

	render() {
		return (
			<div>
				<Helmet
					title='小船'
					titleTemplate='小船 - %s'
					meta={[
						{'char-set': 'utf-8'},
						{name: 'viewport', content:'width=device-width,initial-scale=1,user-scalable=0'}
					]}
					link={[
						{'rel': 'stylesheet', 'type':'text/css', 'href': 'https://res.wx.qq.com/open/libs/weui/0.4.2/weui.min.css'}
					]}
				/>

				{this.props.children}
			</div>
		);
	}
}

export default withRouter(App);