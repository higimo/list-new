const hierarchicalStructure = list => {
	list.sort((a, b) => a.parent - b.parent)
	let result = {}
	list.map(i => ({ ...i, child: [] })).forEach(item => {
		result[item.id] = item
		if (result[item.parent]) {
			result[item.parent].child.push(item)
		}
	})
	return Object.values(result)
}

export default hierarchicalStructure
