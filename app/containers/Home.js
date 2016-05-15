import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as NewsActions from '../actions/news';
import * as NewsBeforeActions from '../actions/newsBefore';
import NewsList from '../components/NewsList';
import NewsFeature from '../components/NewsFeature';
import InfiniteScroll from 'redux-infinite-scroll';
import { Toast, CellsTitle } from 'react-weui';
import moment from 'moment';
// @connect(state => { users: state.users })
class Home extends Component {

	static readyOnActions(dispatch) {
		return Promise.all([
			dispatch(NewsActions.fetchNewsIfNeeded()),
		]);
	}

	componentDidMount() {
		Home.readyOnActions(this.props.dispatch);
	}

	handleInfiniteLoad() {
		const newsBefore = this.props.newsBefore;
		if (newsBefore.readyState === NewsBeforeActions.NEWSBEFORE_FETCHING ||
			newsBefore.readyState === NewsBeforeActions.NEWS_FETCH_FAILED) {
			return false;
		}

		if(typeof document !== 'undefined'){
			if (newsBefore.readyState === NewsBeforeActions.NEWSBEFORE_INVALID) {
				this.props.dispatch(NewsBeforeActions.fetchNewsBeforeIfNeeded(this.props.news.date));
			}else{
				this.props.dispatch(NewsBeforeActions.fetchNewsBeforeIfNeeded(this.props.newsBefore.currentDate));
			}
		}

	}

	loadingmore(){
		const newsBefore = this.props.newsBefore;

		if (newsBefore.readyState === NewsBeforeActions.NEWSBEFORE_FETCHING ||
			newsBefore.readyState === NewsBeforeActions.NEWS_FETCH_FAILED) {
			return true;
		}

		if (newsBefore.readyState === NewsBeforeActions.NEWSBEFORE_INVALID) {
			return true;
		}

		return false;
	}

	renderNewsBefore() {
		const newsBefore = this.props.newsBefore;

		if (newsBefore.readyState === NewsBeforeActions.NEWSBEFORE_INVALID ||
			newsBefore.readyState === NewsBeforeActions.NEWSBEFORE_FETCHING) {
			return [];
		}

		if (newsBefore.readyState === NewsBeforeActions.NEWS_FETCH_FAILED ) {
			return [];
		}

		return Object.keys(newsBefore.news).map(i=>{
			return (
				<div>
					<CellsTitle>{i}</CellsTitle>
					<NewsList news={newsBefore.news[i].stories} key={i} />
				</div>
			)
		});
	}

	renderNews() {
		const news = this.props.news;
		const newsBefore = this.props.newsBefore;

		if (news.readyState === NewsActions.NEWS_INVALID ||
			news.readyState === NewsActions.NEWS_FETCHING) {
			return <Toast icon="loading" show={true}>loading...</Toast>;
		}

		if (news.readyState === NewsActions.NEWS_FETCH_FAILED) {
			return <p>Failed to fetch news</p>;
		}

		if(news.date && !newsBefore.currentDate){
			this.handleInfiniteLoad();
		}

		return (
			<NewsList news={news.stories} />
		);
	}

	renderFeature() {
		const news = this.props.news;

		if (news.readyState === NewsActions.NEWS_INVALID ||
			news.readyState === NewsActions.NEWS_FETCHING) {
			return <p>Loading...</p>;
		}

		if (news.readyState === NewsActions.NEWS_FETCH_FAILED) {
			return <p>Failed to fetch news</p>;
		}

		return <NewsFeature news={news.features} />;
	}

	//
	//
	render() {
		return (
			<div>
				<Helmet title='日报' />
				{this.renderFeature()}
				{this.renderNews()}
				<InfiniteScroll
		          loadMore={this.handleInfiniteLoad.bind(this)}

		          elementIsScrollable={false}
		        >
		        	{this.renderNewsBefore()}
		        </InfiniteScroll>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		news: state.news,
		newsBefore: state.newsBefore
	};
}

export default connect(mapStateToProps)(Home);