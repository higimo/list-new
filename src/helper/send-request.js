import getAuthPair from './get-auth-pair'

var httpBuildQuery = require('http-build-query')

const sendRequest = (url, { method = 'GET', auth = null, values = {} } = {}) => new Promise((resolve) => {
	var xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let json
			try {
				let jsonObj = JSON.parse(this.responseText)

				json = jsonObj.data
			} catch (e) {
				json = this.responseText
			}
			resolve(json)
		}
	}

	xhttp.open(method, url, true)

	const { login, password } = auth || getAuthPair()
	if (login && password) {
		xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(login + ':' + password))
	}

	xhttp.setRequestHeader('Accept', 'application/json')
	xhttp.setRequestHeader('Content-Type', method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded')

	xhttp.send(httpBuildQuery(values))
})

export default sendRequest
