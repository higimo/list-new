const hierarchicalStructure = list => {
	const hashMap = {}
	for (let i = 0, l = list.length; i < l; i++) {
		hashMap[list[i].id] = list[i]
		hashMap[list[i].id].child = []
	}
	for (let i = 0, l = list.length; i < l; i++) {
		if (list[i].parent) {
			if (hashMap[list[i].parent]) {
				hashMap[list[i].parent].child.push(list[i])
			} else {
				list[i].parent = null
			}
		}
	}
	return Object.values(hashMap)
}

export default hierarchicalStructure