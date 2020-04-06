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

export const getEarthquakesInRadius = async ({lat, long}, maxRadiusKm, startTime, orderBy = 'magnitude') => {

	const endTime = new Date(startTime)
	endTime.setDate(new Date(startTime).getDate() + parameterConfig.DAYS_BETWEEN_QUAKES)
	const queryParams = new URLSearchParams()
	// starttime should be the time of the parent quake
	queryParams.set('starttime', startTime)
	// endtime = the current event's time plus duration
	queryParams.set('endtime', endTime.toISOString())
	queryParams.set('longitude', long)
	queryParams.set('latitude', lat)
	queryParams.set('maxradiuskm', maxRadiusKm)
	queryParams.set('limit', parameterConfig.LIMIT)
	queryParams.set('orderby', orderBy)

	const url = `${parameterConfig.USGS_API_URL}?${queryParams.toString()}`
	console.log(`making a call on ${url}`)
	const response = await fetch(url)

	if (response.status !== 200) {
		console.log(response)

		return null
	}

	return (await response.json()).features
}
