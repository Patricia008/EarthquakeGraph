export default class EarthquakeModel {

	properties: {
		mag: number,
		place: string,
		time: string,
		tsunami: number,
		title: string,
		magType: string,
	}
	geometry: {
		type: string,
		coordinates: number[],
	}
	id: string
	visited: boolean

	constructor(data) {
		Object.assign(this, data)
		this.properties.time = new Date(data.properties.time).toISOString()
	}
}
