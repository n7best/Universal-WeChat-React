import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { dispatch } from 'redux';
import { connect } from 'react-redux';
import * as NewsDetailActions from '../actions/newsDetail';

import { Toast } from 'react-weui';
// @connect(state => { user: state.user })
class NewsDetail extends Component {

	static readyOnActions(dispatch, params) {
		return Promise.all([
			dispatch(NewsDetailActions.fetchNewsDetailIfNeeded(params.id))
		]);
	}

	componentDidMount() {
		NewsDetail.readyOnActions(this.props.dispatch, this.props.params);
	}

	renderNewsDetail() {
		const newsDetail = this.props.newsDetail;

		if (newsDetail.readyState === NewsDetailActions.NEWSDETAIL_FETCHING ||
			newsDetail.readyState === NewsDetailActions.NEWSDETAIL_INVALID) {
			return <Toast icon="loading" show={true}>loading...</Toast>;
		}

		if (newsDetail.readyState === NewsDetailActions.NEWSDETAIL_FETCH_FAILED) {
			return <p>Failed to fetch News Detail</p>;
		}

		let pattern = /<div .*?class="img-place-holder">(.*?)<\/div>/;
		let elImg = `<img src="${newsDetail.detail.image}" style="margin-top: -150px"/>`;
		let parsedHtml = newsDetail.detail.body.replace(pattern, elImg);
		return (
		<div>
			<Helmet
				title={newsDetail.detail.title}
				link={[
					{'rel': 'stylesheet', 'type':'text/css', 'href': newsDetail.detail.css[0]}
				]}
			/>
			<div dangerouslySetInnerHTML={{__html: parsedHtml}}/>
		</div>
		);
	}

	render() {
		return (
			<div>
				<Helmet
					title='newsdetail'
					meta={[
						{'name': 'description', 'content': 'User Profile'}
					]}
				/>
				{this.renderNewsDetail()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		newsDetail: state.newsDetail
	};
}

export default connect(mapStateToProps)(NewsDetail);