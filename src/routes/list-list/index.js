import { useState, useEffect } from 'preact/hooks'

import ListElement from 'components/list-element'

import hierarchicalStructure from 'helper/hierarchical-structure'

import './style'

const ListList = ({ id = 0 }) => {
	const [list, setData] = useState([])

	useEffect(() => {
		fetch(`http://higimo.ru/api/v1/lister/item?withChild=true&filter[code]=${id}&filter[id]=${id}`)
			.then(i => i.json())
			.then(i => setData(i.data))
	}, [id])

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
