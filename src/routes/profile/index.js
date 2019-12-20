import './style'

import ListElement from 'components/list-element'
import list from 'data/list'

import hierarchicalStructure from 'helper/hierarchical-structure'

const Profile = ({ id }) => {
	const arr = hierarchicalStructure(list)
	const parent = arr.filter(i => i.id == id)
	const isAuthorized = 1
	return (
		<div class="home">
			{parent.map((item, iter) => (
				<ListElement key={iter} {...item} isAuthorized={isAuthorized} />
			))}
		</div>
	)
}


export default Profile