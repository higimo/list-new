import cookies from 'js-cookie'

const getAuthPair = () => {
	if (!cookies.get('name') && !cookies.get('password')) {
		return { login: null, password: null }
	}
	return { login: cookies.get('name'), password: cookies.get('password') }
}

export default getAuthPair
