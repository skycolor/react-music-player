import React from 'react';
import { Link } from 'react-router-dom'

class MusicList extends React.Component {
  render() {
    return (
      <div>
      	<h1>我是音乐列表页</h1>
      	<p>
	      	<Link to="/player">
	          	去播放页
	        </Link>
        </p>
      </div>
    );
  }
}

export default MusicList;