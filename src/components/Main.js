import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

/*引入组件*/
import Header from './Header';
import Footer from './Footer';
import Player from './Player';
import MusicList from './MusicList';
import Pubsub from 'pubsub-js'
import storeUtil from '../tool/store.js'

require('../styles/main.scss')

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			songlist: storeUtil.getList() ,
			playItemIndex: storeUtil.getIndex() ,
			isPlay: false
		};
	}
	playMusic(playItemIndex) { //播放音乐
		let playItem = this.state.songlist[playItemIndex];
		let musicUrl = playItem.url;
		let _this = this;
		$("#player").jPlayer({			//音乐播放
			ready: function() {
				$(this).jPlayer("setMedia", {
					mp3: musicUrl
				}).jPlayer("play");
				_this.setState({
					isPlay : true
				});
			} ,
			ended: function() { 			//当前音乐结束后触发事件，默认顺序播放
				let i = ((index) => {
					index++;
					return index >= _this.state.songlist.length ? 0 : index;
				})(_this.state.playItemIndex);
				_this.saveIndex(i);
			    $(this).jPlayer("setMedia", {
					mp3: _this.state.songlist[i].url
				}).jPlayer("play");
			} ,
			timeupdate : function(e){		//播放时间更新事件
				PubSub.publish("PLAY_MUSIC_PROGRESS" , parseInt(e.jPlayer.status.currentTime));		
			}
		})
	}
	changeMusic(index) {			//切换音乐
		$("#player").jPlayer("setMedia", {
			mp3: this.state.songlist[index].url
		}).jPlayer("play");
	}
	playOrPause() {			//暂停或者播放
		if(this.state.isPlay){
			$("#player").jPlayer("pause");
			this.setState({isPlay : false});
		}else{
			$("#player").jPlayer("play");
			this.setState({isPlay : true});
		}
	}
	backwardMusic(){			//上一首歌曲
		let index = this.state.playItemIndex - 1;
		index = index < 0 ? (this.state.songlist.length - 1) : index;
		Pubsub.publish('PLAY_MUSIC' , index);
	}
	forwardMusic(){			//下一首歌曲
		let index = this.state.playItemIndex + 1;
		Pubsub.publish('PLAY_MUSIC' , index);
	}
	saveIndex(index){			//存储index
		this.setState({playItemIndex : index});
		storeUtil.saveIndex(index);
	}
	reqQQmusic(callback) { //请求QQ音乐榜单100
		const requestUrl = 'https://ali-qqmusic.showapi.com/top?topid=6';
		const signHeader = {
			'Authorization' : 'APPCODE a79b7a6118d54c2eaf7a1781b820fa73'
		};
		fetch(requestUrl, { //使用fetch请求QQ音乐
			method: "get",
			headers: signHeader
		}).then(response => response.json()).then(data => {
			let code = data.showapi_res_code;
			if(code != 0) return;
			let list = data.showapi_res_body.pagebean.songlist;
			//将请求到的数据保存到sessionStorage
			this.saveIndex(0); 
			storeUtil.saveList(list); 
			this.setState({
	        		songlist : list 
	        });
	        callback.call(null);
		})
	}
	bindAndHanlePubsub(){			//绑定订阅发布模式
		Pubsub.subscribe('PLAY_MUSIC' , (msg , playItemIndex) =>{
			//第一步：存储信息
			this.saveIndex(playItemIndex);
	        //第二步：切换音乐
			this.changeMusic(playItemIndex)
		});
		Pubsub.subscribe('PLAY_MUSIC_PROGRESS' , (msg , curSecs) =>{
			
		});
	}
	componentDidMount(){
		//第一步：配置订阅和发布项
		this.bindAndHanlePubsub();
		//第二步：请求数据，初始化歌曲列表
		let list = this.state.songlist;
		let callback = () => this.playMusic(this.state.playItemIndex);
		if(list && list.length > 0 )
	        callback.call(null);
		else
			this.reqQQmusic(callback);
	}
	componentWillUnmount(){
		Pubsub.unsubscribe('PLAY_MUSIC');
		$("#player").jPlayer("destroy");
	}
	render() {
		return(
			  <Router>
			      <div>
			  		<Header />
					<Route exact path='/' component={Player} />
			      	<Route path='/player/:index' component={Player}/>
			      	<Route path='/list' component={MusicList}/>
			      	<Route component={Player}/>
			  		<Footer next={this.forwardMusic} prev={this.backwardMusic} context={this} play={this.playOrPause} isPlay={this.state.isPlay} />
			  		<div  id="player"  ></div>
			      </div>
		      </Router>
		);
	}
}

export default AppComponent