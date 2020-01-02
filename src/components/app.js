import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Home from '../routes/home'
import ListList from '../routes/list-list'
import ListListEdit from '../routes/list-list-edit'

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
			<ListList path="/list-list/" id="1" />
			<ListList path="/list-list/:id" />
			<ListListEdit path="/list-list/:id/edit" />
		</Router>
	</div>
)

export default App
