import { Link } from 'preact-router'

import './style.css'

const ListElement = ({ id, title, child, parent, created_at, code, isAuthorized, ...other }) => {
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
			{!!child && child.map((item, iter) => (
				<ListElement key={iter} {...item} isAuthorized={isAuthorized} />
			))}
		</div>
	)
}

export default ListElement