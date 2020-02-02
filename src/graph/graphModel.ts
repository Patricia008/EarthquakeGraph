import EarthquakeModel from './EarthquakeModel'

export default class GraphModel {
	adjList: Map<EarthquakeModel, EarthquakeModel[]> = new Map<EarthquakeModel, EarthquakeModel[]>()

	addVertex(v: EarthquakeModel) {
		this.adjList.set(v, [])
	}

	addEdge(v: EarthquakeModel, w: EarthquakeModel) {
		this.adjList.get(v).push(w)
	}

	printGraph() {
		const vertices = this.adjList.keys()
		for (const vertex of vertices) {
			const children = this.adjList.get(vertex)
			let auxString = ''
			for (const child of children) {
				auxString += child.properties.title + ', '
			}
			console.log(vertex.properties.title + ' -> ' + auxString)
		}
	}
}
