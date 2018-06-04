import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AtmsContainer from '../atms/AtmsContainer';
import BanksContainer from '../banks/BanksContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render()
	{
		return (
			<div className="app">
				<div className="app-topbar">
					<img src={logo} className="app-topbar-logo" alt="logo"/>
				</div>
				<Router>
					<Switch>
						<Route path="/atms" component={AtmsContainer}/>
						<Route path="/" component={BanksContainer}/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
