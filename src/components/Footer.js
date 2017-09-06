import React from 'react';
import { Link } from 'react-router-dom'

//引入样式
require('../styles/footer.scss')

class Footer extends React.Component {
	constructor(props) {
	    super(props);
	}
  	render() {
	    return (
		      <nav className="navbar navbar-inverse navbar-fixed-bottom">
				  <div className="container">
					  	<div className="row">
				  			<div className="col-xs-2 glyphicon glyphicon-random music-control " aria-hidden="true" ></div>
				  			<div className="col-xs-3 glyphicon glyphicon-step-backward music-control"></div>
				  			<div className="col-xs-2 glyphicon glyphicon-play-circle music-control"></div>
				  			<div className="col-xs-3 glyphicon glyphicon-step-forward music-control"></div>
				  			<div className="col-xs-2 glyphicon glyphicon-list music-control">
				  				<Link className="music-control-list" to="/list"></Link>
				  			</div>
					  	</div>
				  </div>
			  </nav>
	    );
  	}
}

export default Footer;