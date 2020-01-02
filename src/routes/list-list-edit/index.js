import { useState, useEffect } from 'preact/hooks'
import { useForm } from 'react-hook-form'

import ListElement from 'components/list-element'

import hierarchicalStructure from 'helper/hierarchical-structure'

import './style'

const getHashTableByIdArray = arr => arr.reduce((all, i) => ({ ...all, [i.id]: i }), {})

const ListListEdit = ({ id = 0 }) => {
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

				let fd = new FormData()
				fd.append('id', value && value.id)
				fd.append('value', data[pair.join('/')])
				fd.append('property', (value && value.property) || pair[1])
				fd.append('item', data.id)
				fetch(
					`http://higimo.ru/api/v1/lister/value/${value && value.id}`,
					{
						method: 'POST',
						headers: {
							// Authorization: 'Basic ' + base64.encode(username + ":" + password),
						// 	'Accept': 'application/json',
						// 	'Content-Type': 'application/x-www-form-urlencoded',
						},
						// body: JSON.stringify(obj),
						body: fd,
					}
				)
			})
		// console.log(data)
	}

	useEffect(() => {
		fetch(`http://higimo.ru/api/v1/lister/item?filter[code]=${id}&filter[id]=${id}`)
			.then(i => i.json())
			.then(i => setData(i.data))
	}, [id])

	useEffect(() => {
		fetch(`http://higimo.ru/api/v1/lister/property/byItemId?filter[id]=${id}`)
			.then(i => i.json())
			.then(i => setProperty(i.data))
	}, [id])

	const itemIds = list.map(i => i.id)
	useEffect(() => {
		fetch(`http://higimo.ru/api/v1/lister/value/byItemsId?filter[item]=${itemIds.join(',')}`)
			.then(i => i.json())
			.then(i => setValues(i.data))
	}, [id, ...itemIds])

	const element = list[0] || {}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form_row">
				<label>id</label>
				<input name="id" readonly value={element.id} ref={register} />
			</div>
			<div className="form_row">
				<label>title</label>
				<input name="title" value={element.title} ref={register} />
			</div>
			<div className="form_row">
				<label>created_at</label>
				<input name="created_at" value={element.created_at} ref={register} />
			</div>
			<div className="form_row">
				<label>parent</label>
				<input name="parent" readonly value={element.parent} ref={register} />
			</div>
			<div className="form_row">
				<label>code</label>
				<input name="code" value={element.code} ref={register} />
			</div>
			{propertys.map(property => (
				<div className="form_row">
					<label>{property.name}</label>
					<input
						name={`prop/${property.id}`}
						type={property.type}
						value={(values.find(i => i.property == property.id) || {}).value}
						ref={register}
					/>
				</div>
			))}
			{/*<div className="test">
				<input name="lastname" ref={register({ required: true })} />
				{errors.lastname && 'Last name is required.'}
			</div>
			<div className="test">
				<input name="age" ref={register({ pattern: /\d+/ })} />
				{errors.age && 'Please enter number for age.'}
			</div>*/}
			<button>Сохранить</button>
		</form>
	)

	// const arr = hierarchicalStructure(list)
	// const parent = arr.filter(i => i.id == id)
	// const isAuthorized = 1
	// return (
	// 	<div class="home">
	// 		{parent.map((item, iter) => (
	// 			<ListElement
	// 				key={iter}
	// 				{...item}
	// 				propertys={getHashTableByIdArray(propertys)}
	// 				values={values}
	// 				isAuthorized={isAuthorized}
	// 			/>
	// 		))}
	// 	</div>
	// )
}

export default ListListEdit
