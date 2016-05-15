import React, { Component } from 'react';
import { Link } from 'react-router';
import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    Panel,
    PanelBody,
} from 'react-weui';

class NewsList extends Component {

	render() {
		return (
			<Panel style={{marginTop: '0px'}}>
				<PanelBody>
				{this.props.news.map((news) => {
					return (
						<Link key={news.id} type="appmsg" className="weui_media_box weui_media_appmsg" to={`news/${news.id}`}>
							{news.images[0] ?
		                    	<MediaBoxHeader><img src={news.images[0]}/></MediaBoxHeader>
		                     : false
							}
		                    <MediaBoxBody>
		                       <MediaBoxTitle>{news.title}</MediaBoxTitle>
		                    </MediaBoxBody>
		                </Link>
					);
				})}
				</PanelBody>
			</Panel>
		);
	}
}

export default NewsList;