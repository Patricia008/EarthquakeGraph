import * as dotenv from 'dotenv'

dotenv.config()

const startDate = new Date(2019, 11, 1)

export default {
	USGS_API_URL: process.env.USGS_API_URL,
	STARTTIME: startDate.toISOString(),
	LIMIT: '20000',
	RADIUS: 800,
}
