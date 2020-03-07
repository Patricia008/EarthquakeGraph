import * as dotenv from 'dotenv'
import { counties } from '../config/regionCoordinates'

dotenv.config()

const startDate = new Date(1800, 11, 1)

export const algoEnum = {
	PROPAGATION: 'propagation',
	DEPTH_FIRST: 'depth-first',
	BREADTH_FIRST: 'breadth-first',
}

export default {
	USGS_API_URL: process.env.USGS_API_URL,
	START_POINT: counties.ROMANIA,
	STARTTIME: startDate.toISOString(),
	LIMIT: '20000',
	RADIUS: 400,
	MAX_GRAPH_SIZE: 200,
	MAX_NR_OF_CHILDREN: 10,
	ALGO: algoEnum.DEPTH_FIRST,
}
