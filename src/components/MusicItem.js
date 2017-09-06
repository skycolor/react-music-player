import React from 'react';
import { Link } from 'react-router-dom'


class MusicItem extends React.Component {
  constructor(props) {
	 super(props);
  }
  render() {
  	let songName = this.props.data.songname;
  	let singerName = this.props.data.singername;
  	let index = this.props.index;
  	let className = index == 9 ? 'cur' : '';
    return (
      <div>
      	<h5>
      		<Link className={className} to="/">
      			<i>{index}</i>&nbsp;&nbsp;&nbsp;<em>{songName}</em>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<em>{singerName}</em>
  			</Link>
      	</h5>
      </div>
    );
  }
}

export default MusicItem;