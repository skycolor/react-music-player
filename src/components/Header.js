import React from 'react';

//引入样式
require('../styles/header.scss')

//初始化参数
const logo = require('../imgs/logo.png')

class Header extends React.Component {
	constructor(props) {
	    super(props);
	}
   	render() {
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">
							<img className="logo" alt="音乐" src={logo} />
						</a>
						<p className="navbar-text">我的音乐播放器</p>
					</div>
				</div>
			</nav>
		);
  	}
}

export default Header;