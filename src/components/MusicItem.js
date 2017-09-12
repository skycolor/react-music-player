import React from 'react';
import PropTypes from 'prop-types'

import Pubsub from 'pubsub-js'
import storeUtil from '../tool/store.js'

class MusicItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	static contextTypes = {
		router: PropTypes.object
	}
	handleClick() {
		this.context.router.history.push(`/player/${this.props.index}`);
	}
	render() {
		let index = this.props.index;
		let name = this.props.data.songname;
		let singerName = this.props.data.singername;
		let className = this.props.isCur ? 'cur' : '';
		return(
			 <div onClick={this.handleClick}>
		      	<h5 className={className}>
	      			<i>{index + 1}</i>&nbsp;&nbsp;&nbsp;<em>{name}</em>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<em>{singerName}</em>
		      	</h5>
		     </div>
		);
	}
}

export default MusicItem;