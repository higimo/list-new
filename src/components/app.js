import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Home from '../routes/home'
import Profile from '../routes/profile'

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
			<Profile path="/list-list/" id="1" />
			<Profile path="/list-list/:id" />
		</Router>
	</div>
)

export default App