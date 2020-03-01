import * as dotenv from 'dotenv'
import { counties } from '../config/regionCoordinates'

dotenv.config()

const startDate = new Date(2019, 11, 1)

export const algoEnum = {
	BREADTH_FIRST: 'breadth-first',
	DEPTH_FIRST: 'depth-first',
}

export default {
	USGS_API_URL: process.env.USGS_API_URL,
	START_POINT: counties.ROMANIA,
	STARTTIME: startDate.toISOString(),
	LIMIT: '20000',
	RADIUS: 1000,
	MAX_GRAPH_SIZE: 50,
	ALGO: algoEnum.DEPTH_FIRST,
}
