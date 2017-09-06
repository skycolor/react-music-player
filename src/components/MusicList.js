import React from 'react';
//import { Link } from 'react-router-dom'

//引入工具包
import $ from 'jquery'

//引入模块
import MusicItem from './MusicItem';

//引入样式
require('../styles/musicList.scss');

class MusicList extends React.Component {
  constructor(props) {
  	 super(props);
  	 this.state = {
        songlist : []
    };
  }
  componentDidMount(){     /*渲染完成执行函数*/

  }
  render() {
  	let songItems = [];
  	this.state.songlist.forEach((item , index) => {
  		songItems.push(<MusicItem data={item}  key={index} index={index + 1} />)
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
  },
  requestData(){						//请求QQ音乐榜单100
 	 const requestUrl = 'http://ali-qqmusic.showapi.com/top?topid=6';
	 $.ajax({
		type : 'get',
		url : requestUrl ,
		dataType : 'json' ,
		success: (ret) => {
			let code = ret.showapi_res_code;
	        if(code != 0)	return;
	        let list = ret.showapi_res_body.pagebean.songlist;
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

export default MusicList;