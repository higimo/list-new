import { useForm } from 'react-hook-form'
import { useState } from 'preact/hooks'

import sendRequest from '../../helper/send-request'

import './style.css'

const CreateProperty = ({ parentId }) => {
	const [ show, setShow ] = useState(false)
	const { register, handleSubmit, errors } = useForm()
	const onSubmit = data => {
		sendRequest(
			`/api/v1/lister/property/`,
			{
				method: 'POST',
				values: data,
			}
		).then(() => location.reload())
	}

	return !show ? (
		<button className="create-property-btn" onClick={() => setShow(true)}>
			Добавить новое поле
		</button>
	) : (
		<form onSubmit={handleSubmit(onSubmit)} className="create-property">
			<div className="form_row">
				<label>Название</label>
				<input name="name" ref={register} />
			</div>
			<div className="form_row">
				<label>Тип</label>
				<input name="type" ref={register} />
			</div>
			<div className="form_row">
				<label>Элемент</label>
				<input name="item" value={parentId} ref={register} />
			</div>
			<button>Добавить новое поле</button>
		</form>
	)
}

export default CreateProperty
