import React from 'react';
import { Link } from 'react-router-dom'


class MusicItem extends React.Component {
  constructor(props) {
	 super(props);
  }
  render() {
  	let index = this.props.index;
  	let name = this.props.data.songname;
  	let singerName = this.props.data.singername;
  	let className = index == 0 ? 'cur' : '';
    return (
      <div>
      	<h5>
      		<Link className={className} to={'/player/' + index} >
      			<i>{index + 1}</i>&nbsp;&nbsp;&nbsp;<em>{name}</em>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<em>{singerName}</em>
  			</Link>
      	</h5>
      </div>
    );
  }
}

export default MusicItem;