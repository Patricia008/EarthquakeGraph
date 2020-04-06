import * as dotenv from 'dotenv'
import { regions } from '../config/regionCoordinates'

dotenv.config()

const startDate = new Date(1900, 11, 1)

export const algoEnum = {
	PROPAGATION: 'propagation',
	DEPTH_FIRST: 'depth-first',
	BREADTH_FIRST: 'breadth-first',
}

const maxNrOfChildren = 3

export default {
	USGS_API_URL: process.env.USGS_API_URL,
	START_POINT: regions.CHILE,
	STARTTIME: startDate.toISOString(),
	DAYS_BETWEEN_QUAKES: 10000,
	LIMIT: '' + maxNrOfChildren,
	RADIUS: 20000,
	MAX_GRAPH_SIZE: 500,
	MAX_NR_OF_CHILDREN: maxNrOfChildren,
	ALGO: algoEnum.DEPTH_FIRST,
}
