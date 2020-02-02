import fetch from 'node-fetch'
import parameterConfig from '../config/parameterConfig'

export const getEarthquakesInRectangle = async ({minLat, minLong, maxLat, maxLong}) => {
	const queryParams = new URLSearchParams()
	// endtime default = NOW
	queryParams.set('starttime', parameterConfig.STARTTIME)
	queryParams.set('minlatitude', minLat)
	queryParams.set('minlongitude', minLong)
	queryParams.set('maxlatitude', maxLat)
	queryParams.set('maxlongitude', maxLong)
	queryParams.set('limit', parameterConfig.LIMIT)
	queryParams.set('orderby', 'magnitude')

	const url = `${parameterConfig.USGS_API_URL}?${queryParams.toString()}`
	console.log(`making a call on ${url}`)
	const response = await fetch(url)

	return response.json()
}

export const getEarthquakesInRadius = async (lat, long, maxRadiusKm) => {
	const queryParams = new URLSearchParams()
	// endtime default = NOW
	queryParams.set('starttime', parameterConfig.STARTTIME)
	queryParams.set('latitude', lat)
	queryParams.set('longitude', long)
	queryParams.set('maxradiuskm', maxRadiusKm)
	queryParams.set('limit', parameterConfig.LIMIT)
	queryParams.set('orderby', 'magnitude')

	const url = `${parameterConfig.USGS_API_URL}?${queryParams.toString()}`
	console.log(`making a call on ${url}`)
	const response = await fetch(url)

	return response.json()
}
