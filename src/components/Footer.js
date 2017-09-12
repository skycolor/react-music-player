import React from 'react';
import { Link } from 'react-router-dom'

//引入样式
require('../styles/footer.scss')

class Footer extends React.Component {
	constructor(props) {
	    super(props);
	    this.playNext = this.playNext.bind(this);
	    this.playPrev = this.playPrev.bind(this);
	    this.playControl = this.playControl.bind(this);
	}
	playNext(){
		this.props.next.apply(this.props.context);
	}
	playPrev(){
		this.props.prev.apply(this.props.context);
	}
	playControl(){
		this.props.play.apply(this.props.context);
	}
  	render() {
  		let isPlay = this.props.isPlay;
  		let playClassName = isPlay ? "glyphicon-pause" : "glyphicon-play";
	    return (
		      <nav className="navbar navbar-inverse navbar-fixed-bottom">
				  <div className="container">
					  	<div className="row">
				  			<div className="col-xs-3 glyphicon glyphicon-step-backward music-control" onClick={this.playPrev} ></div>
				  			<div className={`col-xs-3 glyphicon ${playClassName} music-control`} onClick={this.playControl}></div>
				  			<div className="col-xs-3 glyphicon glyphicon-step-forward music-control" onClick={this.playNext}></div>
				  			<div className="col-xs-3 glyphicon glyphicon-list music-control">
				  				<Link className="music-control-list" to="/list"></Link>
				  			</div>
					  	</div>
				  </div>
			  </nav>
	    );
  	}
}

export default Footer;