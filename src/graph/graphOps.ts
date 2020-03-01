import { coordinates, counties } from '../config/regionCoordinates'
import { getEarthquakesInRadius, getEarthquakesInRectangle } from '../fetchData/fetchData'
import parameterConfig from '../config/parameterConfig'
import { algoEnum } from '../config/parameterConfig'
import EarthquakeModel from './EarthquakeModel'
import GraphModel from './GraphModel'

async function depth_first_impl(graph: GraphModel, usgsData, quake) {
	for (const entry of usgsData) {
		if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
			return graph
		}
		const quakeModel = new EarthquakeModel(entry)
		if (!graph.isVertexPresent(quakeModel)) {
			graph.addVertex(quakeModel)
		}
		if (!graph.isEdgePresent(quake, quakeModel)) {
			graph.addEdge(quake, quakeModel)
		}
		if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
			return graph
		}
	}

	for (const entry of usgsData) {
		const quakeModel = new EarthquakeModel(entry)
		if (!quakeModel.visited) {
			quakeModel.visited = true
			graph = await getAdjacentQuakes(graph, quakeModel)
		}
	}

	return graph
}

async function breadth_first_impl(graph: GraphModel, usgsData, quake) {
	for (const entry of usgsData) {
		if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
			return graph
		}
		const quakeModel = new EarthquakeModel(entry)
		if (!graph.isVertexPresent(quakeModel)) {
			graph.addVertex(quakeModel)
			quakeModel.visited = true
		}
		if (!graph.isEdgePresent(quake, quakeModel)) {
			graph.addEdge(quake, quakeModel)
		}
		if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
			return graph
		}
	}
	const q = [...graph.adjList.keys()].find(qu => !qu.visited)
	if (!q) {
		return graph
	}
	graph = await getAdjacentQuakes(graph, q)

	return graph
}

const getAdjacentQuakes = async (graph: GraphModel, quake: EarthquakeModel) => {

	if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
		return graph
	}
	// [lat, long]
	const coord = quake.geometry.coordinates

	// CALL API FOR EARTHQUAKES THAT HAPPENED BEFORE THE CURRENT ONE
	const usgsData = await getEarthquakesInRadius(
		coord[0], coord[1], parameterConfig.RADIUS, quake.properties.time)

	if (usgsData.length === 0) {
		console.log('No earthquakes found')

		return graph
	}

	// ADD THEM AS CHILDREN
	if (parameterConfig.ALGO === algoEnum.DEPTH_FIRST) {
		graph = await depth_first_impl(graph, usgsData, quake)
	} else if (parameterConfig.ALGO === algoEnum.BREADTH_FIRST) {
		graph = await breadth_first_impl(graph, usgsData, quake)
	}

	return graph
}

export const buildGraph = async (graph: GraphModel) => {

	// FIND MOST RECENT EARTHQUAKE IN REGION
	const usgsData = await getEarthquakesInRectangle(coordinates[parameterConfig.START_POINT], 'time')

	if (!(usgsData instanceof Array)) {
		console.log('Failed Response', usgsData)
	}
	if (usgsData.length === 0) {
		console.log('No earthquakes found')

		return null
	}
	const largestMagnitudeQuake = new EarthquakeModel(usgsData[0])

	// CONSIDER IT ROOT OF THE GRAPH
	graph.addVertex(largestMagnitudeQuake)

	// FIND SUBSEQUENT EARTHQUAKES AND REPEAT THE PROCESS FOR THE CHILDREN
	graph = await getAdjacentQuakes(graph, largestMagnitudeQuake)

	return usgsData
}
