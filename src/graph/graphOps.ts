import { coordinates, counties } from '../config/regionCoordinates'
import { getEarthquakesInRectangle } from '../fetchData/fetchData'
import EarthquakeModel from './EarthquakeModel'
import GraphModel from './GraphModel'

export const buildGraph = async (graph: GraphModel, county: counties) => {

	// FIND MOST RECENT EARTHQUAKE IN REGION
	const usgsData = await getEarthquakesInRectangle(coordinates[county], 'time')

	if (usgsData.length === 0) {
		console.log('No earthquakes found')

		return null
	}
	const largestMagnitudeQuake = new EarthquakeModel(usgsData[0])
	console.log(largestMagnitudeQuake)

	// CONSIDER IT ROOT OF THE GRAPH
	graph.addVertex(largestMagnitudeQuake)

	// FIND SUBSEQUENT EARTHQUAKES

	// CALL API FOR EARTHQUAKES THAT HAPPENED BEFORE THE CURRENT ONE

	// ADD THEM AS CHILDREN

	// REPEAT THE PROCESS FOR THE CHILDREN

	return usgsData
}
