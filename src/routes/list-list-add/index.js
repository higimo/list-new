import CreateProperty from '../../components/create-property'
import sendRequest from '../../helper/send-request'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'preact/hooks'

const ListListCreate = ({ id = 0 }) => {
	const [ list, setData ] = useState([])
	const [ propertys, setProperty ] = useState([])
	const [ values, setValues ] = useState([])
	const { register, handleSubmit, errors } = useForm()
	const onSubmit = data => {
		Object.keys(data)
			.filter(i => i.includes('prop'))
			.map(i => i.split('/'))
			.map(pair => {
				const value = values.find(value => value.property == pair[1]) || null
				if (!data[pair.join('/')]) {
					return
				}
				sendRequest(
					`/api/v1/lister/value`,
					{
						method: 'POST',
						values: {
							id: value && value.id,
							value: data[pair.join('/')],
							property: (value && value.property) || pair[1],
							item: data.id,
						},
					}
				)
			})
		sendRequest(
			`/api/v1/lister/item`,
			{
				method: 'POST',
				values: data,
			}
		).then(() => location.reload())
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form_row">
				<label>id</label>
				<input name="id" readonly ref={register} />
			</div>
			<div className="form_row">
				<label>title</label>
				<input name="title" ref={register} />
			</div>
			<div className="form_row">
				<label>created_at</label>
				<input name="created_at" ref={register} />
			</div>
			<div className="form_row">
				<label>parent</label>
				<input name="parent" value={id} ref={register} />
			</div>
			<div className="form_row">
				<label>code</label>
				<input name="code" ref={register} />
			</div>
			<button>Сохранить</button>
		</form>
	)
}

export default ListListCreate
