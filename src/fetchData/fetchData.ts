import fetch from 'node-fetch'
import parameterConfig from '../config/parameterConfig'

export const getEarthquakesInRectangle = async ({minLat, minLong, maxLat, maxLong}, orderby) => {
	const queryParams = new URLSearchParams()
	// endtime default = NOW
	queryParams.set('starttime', parameterConfig.STARTTIME)
	queryParams.set('minlatitude', minLat)
	queryParams.set('minlongitude', minLong)
	queryParams.set('maxlatitude', maxLat)
	queryParams.set('maxlongitude', maxLong)
	queryParams.set('limit', parameterConfig.LIMIT)
	queryParams.set('orderby', orderby)

	const url = `${parameterConfig.USGS_API_URL}?${queryParams.toString()}`
	console.log(`making a call on ${url}`)
	const response = await fetch(url)

	if (response.status !== 200) {
		console.log(response)

		return null
	}

	return (await response.json()).features
}

export const getEarthquakesInRadius = async (lat, long, maxRadiusKm, endTime) => {
	const queryParams = new URLSearchParams()
	queryParams.set('starttime', parameterConfig.STARTTIME)
	// endtime should be the time of the parent quake
	queryParams.set('endtime', endTime)
	queryParams.set('latitude', lat)
	queryParams.set('longitude', long)
	queryParams.set('maxradiuskm', maxRadiusKm)
	queryParams.set('limit', parameterConfig.LIMIT)
	queryParams.set('orderby', 'magnitude')

	const url = `${parameterConfig.USGS_API_URL}?${queryParams.toString()}`
	console.log(`making a call on ${url}`)
	const response = await fetch(url)

	if (response.status !== 200) {
		console.log(response)

		return null
	}

	return (await response.json()).features
}
