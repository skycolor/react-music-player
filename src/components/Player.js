import React from 'react';

//初始化参数
const songImg = require('../imgs/songImg.jpg');

//引入样式
require('../styles/player.scss');

class Player extends React.Component {
  render() {
    return (
		<section className="container text-center main">
			<div className="row">
			  <div className="col-xs-2">&nbsp;</div>
			  <div className="col-xs-8 ">
			  	<img className="img-circle music-logo" src={songImg} />
			  </div>
			  <div className="col-xs-2">&nbsp;</div>
			</div>
			<div className="row music-title">
				<h4>
					电台情歌
				</h4>
			</div>
			<div className="row" >
				<h6>
					邓超
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
}

export default Player;