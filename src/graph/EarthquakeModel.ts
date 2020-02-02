export default class EarthquakeModel {

	properties: {
		mag: number,
		place: string,
		time: Date,
		tsunami: number,
		title: string,
		magType: string,
	}
	geometry: {
		type: string,
		coordinates: number[],
	}
	id: string

	constructor(data) {
		Object.assign(this, data)
	}
}
