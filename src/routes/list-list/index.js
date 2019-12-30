import { useState, useEffect } from 'preact/hooks'

import ListElement from 'components/list-element'

import hierarchicalStructure from 'helper/hierarchical-structure'

import './style'

const getHashTableByIdArray = arr => arr.reduce((all, i) => ({ ...all, [i.id]: i }), {})

const ListList = ({ id = 0 }) => {
	const [list, setData] = useState([])
	const [propertys, setProperty] = useState([])
	const [values, setValues] = useState([])

	useEffect(() => {
		fetch(`http://higimo.ru/api/v1/lister/item?withChild=true&filter[code]=${id}&filter[id]=${id}`)
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

	const arr = hierarchicalStructure(list)
	const parent = arr.filter(i => i.id == id)
	const isAuthorized = 1
	return (
		<div class="home">
			{parent.map((item, iter) => (
				<ListElement
					key={iter}
					{...item}
					propertys={getHashTableByIdArray(propertys)}
					values={values}
					isAuthorized={isAuthorized}
				/>
			))}
		</div>
	)
}


export default ListList
