import React from 'react';
import {Link} from 'react-router-dom'

class Player extends React.Component {
  render() {
    return (
      <div>
      	<h1>我是播放页</h1>
      	<p>
	      	<Link to="list" >
	          	去列表页
	        </Link>
        </p>
      </div>
    );
  }
}

export default Player;