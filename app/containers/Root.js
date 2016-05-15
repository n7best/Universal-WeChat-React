/* global wcApi, __ENVIRONMENT__ */
import React, { Component } from 'react';

class Root extends Component {

	renderInitialState() {
		if (this.props.initialState) {
			const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
			return <script dangerouslySetInnerHTML={{__html: innerHtml}} />;
		}
	}

	renderEnvironment() {
		const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`;
		return <script dangerouslySetInnerHTML={{__html: innerHtml}} />
	}

	renderWCConfigs() {
		const innerHtml = `window.__WC_CONFIGS__ = ${JSON.stringify(this.props.wcConfigs)}`;
		return <script dangerouslySetInnerHTML={{__html: innerHtml}} />;
	}

	render() {
		const head = this.props.head;
		//wecahat sdk

		return (
			<html>
				<head>
					{head.title.toComponent()}
					{head.meta.toComponent()}
					{head.link.toComponent()}
				</head>
				<body>
					<div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
					{this.renderEnvironment()}
					{this.renderInitialState()}
					{this.renderWCConfigs()}
					{head.script.toComponent()}
					<script src={!process.env.NODE_ENV ? '/app.js' : '/app.min.js'}></script>
				</body>
			</html>
		);
	}
}

export default Root;