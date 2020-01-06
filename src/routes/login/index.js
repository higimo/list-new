import { route } from 'preact-router'
import { Fragment } from 'preact'
import { useForm } from 'react-hook-form'
import cookies from 'js-cookie'
import sendRequest from '../../helper/send-request'

const LoginPage = () => {
	const { register, handleSubmit, errors, ...props } = useForm()

	const onSubmit = ({ login, password }) => {
		sendRequest('/api/v1/auth/login', { auth: { login, password } })
			.then(isAuthorized => {
				if (isAuthorized) {
					cookies.set('name', login)
					cookies.set('password', password)
					route('/', true)
				}
			})
	}

	return (
		<Fragment>
			<h2>Авторизоваться</h2>
			<form name="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="form_row">
					<label>Логин</label>
					<input value="higimo" type="text" name="login" ref={register} />
				</div>
				<div className="form_row">
					<label>Пароль</label>
					<input value="vedun666" type="password" name="password" ref={register} />
				</div>
				<div>
					<button>Залогиниться</button>
				</div>
			</form>
		</Fragment>
	)
}

export default LoginPage
