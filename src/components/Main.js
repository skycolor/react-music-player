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
		$("#player").jPlayer({			//音乐播放
			ready: function() {
				$(this).jPlayer("setMedia", {
					mp3: musicUrl
				}).jPlayer("play");
			}
		})
	}
	reqQQmusic(callback) { //请求QQ音乐榜单100
		const requestUrl = 'http://ali-qqmusic.showapi.com/top?topid=6';
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
			storeUtil.saveList(list); 
			storeUtil.saveIndex(0); 
			this.setState({
	        		songlist : list ,
	        		playItemIndex : 0
	        });
	        callback.call(null);
		})
	}
	bindAndHanlePubsub(){			//绑定订阅发布模式
		Pubsub.subscribe('PLAY_MUSIC' , (msg , playItemIndex) =>{
			if(playItemIndex == this.state.playItemIndex) return;
			this.playMusic(playItemIndex)
		})
	}
	componentDidMount(){
		//第一步：配置订阅和发布项
		this.bindAndHanlePubsub();
		//第二步：请求数据，初始化歌曲列表
		let list = this.state.songlist;
		let callback = () => this.playMusic(this.state.playItemIndex);
		if(list && list.length > 0 ){
	        callback.call(null);
		}else
			this.reqQQmusic(callback);
		//第三步：播放音乐
		//this.playMusic(this.state.playItemIndex)
		
	}
	componentWillUnMount(){
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('PLAY_MUSIC_List');
		$('#player').unbind($.jPlayer.event.ended)
	}
	render() {
		return(
			  <Router>
			      <div>
			  		<Header />
					<Route exact path='/' component={Player} />
			      	<Route path='/player/:index' component={Player}/>
			      	<Route path='/list' component={MusicList}/>
			  		<Footer />
			  		<div  id="player" ></div>
			      </div>
		      </Router>
		);
	}
}

export default AppComponent