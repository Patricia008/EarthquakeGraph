import { counties } from './config/countyCoordinates'
import { buildGraph } from './graph/graphOps'

buildGraph(counties.TIMIS)
