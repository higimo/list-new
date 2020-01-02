import { Link } from 'preact-router'

import './style.css'

const ListElement = ({
	id,
	title,
	child,
	parent,
	created_at,
	code,
	isAuthorized,
	propertys,
	values,
	...other
}) => {
	const val = values.filter(i => i.item == id)
	return (
		<div className="element-node">
			<div className="element-node__data">
				{(!!child.length && parent !== null) && (
					<div className="element-node__parent">
						<Link href={`/list-list/${parseInt(parent, 0) || 1}`}>← назад</Link>
					</div>
				)}
				<div className="element-node__title">
					<Link href={`/list-list/${id}`}>{title}</Link>
				</div>
				{!!val.length && (
					<div className="element-node__props">
						{val.map(value => [
							<div
								className="element-node__props-name"
								dangerouslySetInnerHTML={{__html: propertys[value.property].name}}
							/>,
							<div
								className="element-node__props-value"
								dangerouslySetInnerHTML={{__html: value.value}}
							/>
						])}
					</div>
				)}
				<div className="element-node__meta">
					{isAuthorized && (
						<span className="element-node__link">
							<Link href="/list-list/create">создать</Link>
							{' '}
							<Link href={`/list-list/edit/${id}`}>редактировать</Link>
							{' '}
							<span className="pseudo-link">удалить</span>
						</span>
					)}
				</div>
			</div>
			{!!child && child.map(item => (
				<ListElement
					key={item.id}
					{...item}
					propertys={propertys}
					values={values}
					isAuthorized={isAuthorized}
				/>
			))}
		</div>
	)
}

export default ListElement
