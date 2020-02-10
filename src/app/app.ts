import { counties } from '../config/regionCoordinates'
import { buildGraph } from '../graph/graphOps'
import GraphModel from '../graph/GraphModel'

// export const computeAndExportToMap = async () => {
// 	const graph = new GraphModel()
// 	await buildGraph(graph, counties.CHILE)
// 	graph.printGraph()
// 	graph.writeToGeoJsonFile('out/quakes.json')
// }

export const computeAndExportToGraphJson = async () => {
	const graph = new GraphModel()
	await buildGraph(graph, counties.ROMANIA)
	graph.printGraph()
	graph.writeGraphToFile('src/graph.json')
}
