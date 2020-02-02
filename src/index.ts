import { counties } from './config/regionCoordinates'
import { buildGraph } from './graph/graphOps'
import GraphModel from './graph/GraphModel'

const graph = new GraphModel()
buildGraph(graph, counties.CHILE)
graph.printGraph()
