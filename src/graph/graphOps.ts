import { coordinates } from '../config/regionCoordinates'
import { getEarthquakesInRadius, getEarthquakesInRectangle } from '../fetchData/fetchData'
import parameterConfig from '../config/parameterConfig'
import { algoEnum } from '../config/parameterConfig'
import EarthquakeModel from './EarthquakeModel'
import GraphModel from './GraphModel'

async function depth_first_impl(graph: GraphModel, root) {

	root.visited = true

	// FIND SUBSEQUENT EARTHQUAKES AND REPEAT THE PROCESS FOR THE CHILDREN
	const usgsData = await getAdjacentQuakes(graph, root)

	if (!usgsData || usgsData.length === 0) {
		console.log('No earthquakes found')

		return graph
	}

	for (const entry of usgsData) {
		if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
			return graph
		}
		const quakeModel = new EarthquakeModel(entry)

		const presentVertex = graph.isVertexPresent(quakeModel)

		if (!presentVertex) {
			graph.addVertex(quakeModel)
		}
		if (!graph.isEdgePresent(root, quakeModel)) {
			graph.addEdge(root, quakeModel)
		}
		if (presentVertex && presentVertex.visited === true) {
			continue
		}
		await depth_first_impl(graph, quakeModel)
	}

	return graph
}

// start depth first and for each quake, process all subsequent earthquakes, then take one of them and do the same
async function propagation_impl(graph: GraphModel, root: EarthquakeModel) {

	root.visited = true

	// FIND SUBSEQUENT EARTHQUAKES AND REPEAT THE PROCESS FOR THE CHILDREN
	const usgsData = await getAdjacentQuakes(graph, root)

	if (!usgsData || usgsData.length === 0) {
		console.log('No earthquakes found')

		return graph
	}

	let nextToBeProcessed = usgsData[0]
	for (const entry of usgsData) {
		if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
			return graph
		}
		const quakeModel = new EarthquakeModel(entry)

		const presentVertex = graph.isVertexPresent(quakeModel)

		if (!presentVertex) {
			graph.addVertex(quakeModel)
		}
		if (!graph.isEdgePresent(root, quakeModel)) {
			graph.addEdge(root, quakeModel)
		}
		if (presentVertex && presentVertex.visited === false) {
			nextToBeProcessed = presentVertex
		}
	}

	return await propagation_impl(graph, nextToBeProcessed)
}

async function breadth_first_impl(graph: GraphModel, root: EarthquakeModel) {

	const auxVertices = []
	auxVertices.push(root)
	root.visited = true

	while (auxVertices.length > 0) {

		const q = auxVertices.pop()
		// FIND SUBSEQUENT EARTHQUAKES AND REPEAT THE PROCESS FOR THE CHILDREN
		const usgsData = await getAdjacentQuakes(graph, q)

		if (!usgsData || usgsData.length === 0) {
			console.log('No earthquakes found')

			continue
		}

		for (const entry of usgsData) {
			if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
				return graph
			}
			const quakeModel = new EarthquakeModel(entry)

			const presentVertex = graph.isVertexPresent(quakeModel)

			if (!presentVertex) {
				graph.addVertex(quakeModel)
			}
			if (!graph.isEdgePresent(root, quakeModel)) {
				graph.addEdge(root, quakeModel)
			}
			if (!presentVertex || presentVertex.visited === false) {
				auxVertices.push(quakeModel)
				quakeModel.visited = true
			}
		}

	}

	return graph
}


const getAdjacentQuakes = async (graph: GraphModel, quake: EarthquakeModel) => {

	if (graph.adjList.size >= parameterConfig.MAX_GRAPH_SIZE) {
		return []
	}
	// [lat, long]
	const coord = quake.geometry.coordinates

	// CALL API FOR EARTHQUAKES THAT HAPPENED BEFORE THE CURRENT ONE
	const usgsData = await getEarthquakesInRadius(
		coord[0], coord[1], parameterConfig.RADIUS, quake.properties.time)

	return usgsData
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

	// ADD THEM AS CHILDREN
	if (parameterConfig.ALGO === algoEnum.DEPTH_FIRST) {
		graph = await depth_first_impl(graph, largestMagnitudeQuake)
	} else if (parameterConfig.ALGO === algoEnum.PROPAGATION) {
		graph = await propagation_impl(graph, largestMagnitudeQuake)
	} else if (parameterConfig.ALGO === algoEnum.BREADTH_FIRST) {
		graph = await breadth_first_impl(graph, largestMagnitudeQuake)
	}


	return usgsData
}
