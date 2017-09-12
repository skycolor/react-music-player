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
        playItemIndex : storeUtil.getIndex() ,
        curSecs : 0 
     };
     this.handleProgressClick = this.handleProgressClick.bind(this);
  }
  handlePubsub(){			//处理订阅发布模式
	Pubsub.subscribe('PLAY_MUSIC_PROGRESS' , (msg , curSecs) =>{
		this.setState({
			curSecs : curSecs ,
			playItemIndex : storeUtil.getIndex() 
		});
	});
  }
  handleTime(secs){
  	let m =  Math.floor(secs/60);
  	m = m < 10 ? "0" + m : "" + m;
	let s = secs%60;
	s = s < 10 ? "0" + s : "" + s;
	return `${m}:${s}`;
  }
  handleProgressClick(e){
  	let proDom = this.refs.progress;
  	let progressW = proDom.getBoundingClientRect().width;
  	let x = e.clientX - proDom.getBoundingClientRect().left - document.body.scrollLeft;
  	let progress = ((x * 100)/progressW).toFixed(2);
  	$("#player").jPlayer("playHead", progress);
  }
  componentWillUnmount() {
  	Pubsub.unsubscribe('PLAY_MUSIC_PROGRESS');
  }
  componentDidMount(){     /*渲染完成执行函数*/
 	//第一步：配置订阅和发布项
	this.handlePubsub();
	//第二步：获取路由传递来的参数
	var index = this.props.match.params.index;
	if(index && index != this.state.playItemIndex){		//当获取到了参数，并且跟当前播放的索引不一样
		PubSub.publish("PLAY_MUSIC" , index);
	}
  }
  render() {
	let playItem = this.state.songlist[this.state.playItemIndex];
	if(!playItem) return (<div></div>);
	let seconds = Number(playItem.seconds);
	let allTime = this.handleTime(seconds);
	let curTime = this.handleTime(this.state.curSecs);
	let progress = ((this.state.curSecs * 100)/seconds).toFixed(2);
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
				<div className="col-xs-2 text-right">{curTime}</div>
				<div className="col-xs-8 music-progress-col">
					<div className="progress music-progress-main" ref="progress" onClick={this.handleProgressClick} >
					  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width : `${progress}%`}}>
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