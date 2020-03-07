import EarthquakeModel from './EarthquakeModel'
import { writeToFile } from '../utils/fileHandlers'

export default class GraphModel {
	adjList: Map<EarthquakeModel, EarthquakeModel[]> = new Map<EarthquakeModel, EarthquakeModel[]>()

	addVertex = (v: EarthquakeModel) => {
		this.adjList.set(v, [])
	}

	addEdge = (v: EarthquakeModel, w: EarthquakeModel) => {
		this.adjList.get(v).push(w)
	}

	isVertexPresent = (v: EarthquakeModel) => {
		for (const [key, value] of this.adjList) {
			if (key.id === v.id) {
				return key
			}
		}

		return false
	}

	isEdgePresent = (a: EarthquakeModel, b: EarthquakeModel) => {
		if (!this.isVertexPresent(a)) {
			return false
		}
		if (!this.adjList.get(a)) {
			this.adjList.set(a, [])

			return false
		}
		this.adjList.get(a).forEach(vertex => {
			if (vertex.id === b.id) {
				return true
			}
		})

		return false
	}

	writeToGeoJsonFile = (filename) => {
		const geoJsonObject = {
			type: 'FeatureCollection',
			features: [],
		}
		for (const vertex of this.adjList.keys()) {
			// const children = this.adjList.get(vertex)
			geoJsonObject.features.push(vertex)
		}
		writeToFile(filename, JSON.stringify(geoJsonObject))
	}

	writeGraphToFile = (filename) => {
		writeToFile(filename, JSON.stringify([...this.adjList]))
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
				auxString += child.properties.title + ` (${child.properties.time})` + ', '
			}
			console.log(vertex.properties.title + ` (${vertex.properties.time})` + ' -> ' + auxString)
		}
	}
}
