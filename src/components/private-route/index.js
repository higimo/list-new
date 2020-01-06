import getAuthPair from '../../helper/get-auth-pair'
import { route } from 'preact-router'
import { h } from 'preact'

const PrivateRoute = ({ component: Component, ...props }) => (
	!!getAuthPair().login
	? h(Component, props)
	: route('/login', true)
)

export default PrivateRoute
