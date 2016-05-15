import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactSwipe from 'react-swipe';

const styles = {
    swiperImage: {
		backgroundSize: 'cover',
		height: '200px',
		width: '100%',
	},
	swiperTitle: {
	    position: 'absolute',
		bottom: '25px',
		left: '10px',
		width: '80%',
		letterSpacing: '1px',
        textShadow: '0px 2px 2px rgba(0, 0, 0, 1)',
        color: '#fff',
        fontSize: '20px'
	}
}

class NewsFeature extends Component {

	render() {
		return (
			<ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
	           {this.props.news.map((news) => {
					return (
						<Link to={`news/${news.id}`} key={news.id}>
						    <img style={Object.assign({},styles.swiperImage,{backgroundImage: `url(${news.image})`})}/>
						    <span style={styles.swiperTitle}>{news.title}</span>
						</Link>
					);
				})}
	       </ReactSwipe>
		);
	}
}

export default NewsFeature;