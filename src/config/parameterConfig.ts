import * as dotenv from 'dotenv'
import { regions } from '../config/regionCoordinates'

dotenv.config()

const startDate = new Date(1800, 11, 1)

export const algoEnum = {
	PROPAGATION: 'propagation',
	DEPTH_FIRST: 'depth-first',
	BREADTH_FIRST: 'breadth-first',
}

export default {
	USGS_API_URL: process.env.USGS_API_URL,
	START_POINT: regions.ROMANIA,
	STARTTIME: startDate.toISOString(),
	LIMIT: '20000',
	RADIUS: 40,
	MAX_GRAPH_SIZE: 100,
	MAX_NR_OF_CHILDREN: 10,
	ALGO: algoEnum.BREADTH_FIRST,
}
