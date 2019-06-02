import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Viewer from "./Viewer";
import Editor from "./Editor";
import "normalize.css";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Viewer} />
					<Route path="/editor" component={Editor} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
