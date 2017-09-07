import React from 'react';

//引入工具包
import $ from 'jquery';
import storeUtil from '../tool/store.js'

//引入样式
require('../styles/player.scss');

class Player extends React.Component {
  constructor(props) {
  	 super(props);
  	 this.state = {
        songlist : [] ,
        playItem : {
        		
        }
    };
  }
  componentDidMount(){     /*渲染完成执行函数*/
 	let index = this.props.match.params.index;
	let list = storeUtil.getObj();
	if(list && list.length > 0 ){
		this.setState({
        		songlist : list ,
        		playItem : list[index || 0]
        });
	}else
		this.reqQQmusic();
  }
  render() {
  	
    return (
		<section className="container text-center main">
			<div className="row">
			  <div className="col-xs-2">&nbsp;</div>
			  <div className="col-xs-8 ">
			  	<img className="img-circle music-logo" src={this.state.playItem.albumpic_big} />
			  </div>
			  <div className="col-xs-2">&nbsp;</div>
			</div>
			<div className="row music-title">
				<h4>
					{this.state.playItem.songname}
				</h4>
			</div>
			<div className="row" >
				<h6>
					{this.state.playItem.singername}
				</h6>
			</div>
			<div className="row music-progress" >
				<div className="col-xs-2 text-right">00:01</div>
				<div className="col-xs-8 music-progress-col">
					<div className="progress music-progress-main" >
					  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width : '60%'}}>
					  </div>
					</div>
				</div>
				<div className="col-xs-2 text-left">03:40</div>
			</div>
		</section>
    );
  }
  reqQQmusic(){						//请求QQ音乐榜单100
 	 const requestUrl = 'http://ali-qqmusic.showapi.com/top?topid=6';
	 $.ajax({
		type : 'get',
		url : requestUrl ,
		dataType : 'json' ,
		success: (ret) => {
			let code = ret.showapi_res_code;
	        if(code != 0)	return;
	        let list = ret.showapi_res_body.pagebean.songlist;
	        storeUtil.saveObj(list);			//将请求到的数据保存到localStorage
	        this.setState({
	        		songlist : list
	        });
		},
	    beforeSend: (xhr) => {
			xhr.setRequestHeader('Authorization', 'APPCODE a79b7a6118d54c2eaf7a1781b820fa73');
		}
	 });
  }
}


export default Player;