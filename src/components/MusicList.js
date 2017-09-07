import React from 'react';
//import { Link } from 'react-router-dom'

//引入模块
import MusicItem from './MusicItem';
import storeUtil from '../tool/store.js'
//引入样式
require('../styles/musicList.scss');

class MusicList extends React.Component {
  constructor(props) {
  	 super(props);
  	 this.state = {
        songlist : storeUtil.getObj()
    };
  }
  render() {
  	let songItems = [];
  	this.state.songlist.forEach((item , index) => {
  		songItems.push(<MusicItem data={item}  key={index} index={index} />)
  	})
    return (
      	<section className="container list">
			<div className="row">
				<div className="col-xs-12">
					{songItems}
				</div>
			</div>
		</section>
    );
  }
}

export default MusicList;