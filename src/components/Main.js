import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom'

/*引入组件*/
import Header from './Header';
import Footer from './Footer';
import Player from './Player';
import MusicList from './MusicList';


require('../styles/main.scss')

class AppComponent extends React.Component {
	render() {
	    return (
	    	  <Router>
		      <div>
		  		<Header />
				<Route exact path='/' component={Player}/>
		      	<Route path='/player/:index' component={Player}/>
		      	<Route path='/list' component={MusicList}/>
		  		<Footer />
		      </div>
	      </Router>
	    );
	}
}

export default AppComponent
