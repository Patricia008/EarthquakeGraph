import EarthquakeModel from './EarthquakeModel'

export default class GraphModel {
	adjList: Map<EarthquakeModel, EarthquakeModel[]> = new Map<EarthquakeModel, EarthquakeModel[]>()

	addVertex = (v: EarthquakeModel) => {
		this.adjList.set(v, [])
		console.log(this.adjList)
	}

	addEdge = (v: EarthquakeModel, w: EarthquakeModel) => {
		this.adjList.get(v).push(w)
	}

	isVertexPresent = (v: EarthquakeModel) => {
		for (const [key, value] of this.adjList) {
			if (key.id === v.id) {
				return true
			}
		}

		return false
	}

	isEdgePresent = (a: EarthquakeModel, b: EarthquakeModel) => {
		this.adjList.get(a).forEach(vertex => {
			if (vertex.id === b.id) {
				return true
			}
		})

		return false
	}

	printGraph = () => {
		for (const vertex of this.adjList.keys()) {
			const children = this.adjList.get(vertex)
			let auxString = ''
			// Vertex has no edges
			if (!(children instanceof Array)) {
				continue
			}
			for (const child of children) {
				auxString += child.properties.title + ', '
			}
			console.log(vertex.properties.title + ' -> ' + auxString)
		}
	}
}
