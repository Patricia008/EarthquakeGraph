import { coordinates, counties } from '../config/countyCoordinates'
import { getEarthquakesInRectangle } from '../fetchData/fetchData'

export const buildGraph = async (county: counties) => {
	const usgsData = await getEarthquakesInRectangle(coordinates[county])

	console.log(usgsData)

	return usgsData
}
