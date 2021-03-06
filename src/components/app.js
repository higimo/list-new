import { h, Component } from 'preact'
import { Router } from 'preact-router'

import PrivateRoute from './private-route'
import Home from '../routes/home'
import ListList from '../routes/list-list'
import ListListCreate from '../routes/list-list-add'
import ListListEdit from '../routes/list-list-edit'
import Login from '../routes/login'

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
			<ListList path="/list-list/" id="1" />
			<ListList path="/list-list/:id" />
			<Login path="/login" />
			<PrivateRoute path="/list-list/:id/edit" component={ListListEdit} />
			<PrivateRoute path="/list-list/:id/create" component={ListListCreate} />
			<PrivateRoute path="/list-list/create" component={ListListCreate} />
		</Router>
	</div>
)

export default App
