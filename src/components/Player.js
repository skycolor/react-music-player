import React from 'react';

//引入工具包
import Pubsub from 'pubsub-js'
import storeUtil from '../tool/store.js'

//引入样式
require('../styles/player.scss');

class Player extends React.Component {
  constructor(props) {
  	 super(props);
  	 this.state = {
        songlist : storeUtil.getList() ,
        playItemIndex : storeUtil.getIndex() 
     };
  }
  handlePubsub(){			//处理订阅发布模式
  	Pubsub.subscribe('PLAY_MUSIC_List' , (msg , playSongs) =>{
		this.setState({
        		songlist : playSongs
        });
	});
  }
  componentDidMount(){     /*渲染完成执行函数*/
 	//第一步：配置订阅和发布项
	this.handlePubsub();
  }
  render() {
	let playItem = this.state.songlist[this.state.playItemIndex];
	if(!playItem) return (<div></div>);
	let seconds = playItem.seconds;
	let allTime = ((secs) => {
		let m =  Math.floor(seconds/60);
		let s = secs%60;
		return `${m}:${s}`;
	})(Number(seconds));
    return (
		<section className="container text-center main">
			<div className="row">
			  <div className="col-xs-2">&nbsp;</div>
			  <div className="col-xs-8 ">
			  	<img className="img-circle music-logo" src={playItem.albumpic_big} />
			  </div>
			  <div className="col-xs-2">&nbsp;</div>
			</div>
			<div className="row music-title">
				<h4>
					{playItem.songname}
				</h4>
			</div>
			<div className="row" >
				<h6>
					{playItem.singername}
				</h6>
			</div>
			<div className="row music-progress" >
				<div className="col-xs-2 text-right">00:00</div>
				<div className="col-xs-8 music-progress-col">
					<div className="progress music-progress-main" >
					  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width : '0%'}}>
					  </div>
					</div>
				</div>
				<div className="col-xs-2 text-left">{allTime}</div>
			</div>
		</section>
    );
  }
}


export default Player;