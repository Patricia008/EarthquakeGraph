import express from 'express'
import opn from 'opn'
import { computeAndExportToGraphJson } from './app/App'

// computeAndExportToMap()

const HOST = '127.0.0.1'
const PORT = 1337

computeAndExportToGraphJson().then(() => {

	const app = express()
	app.use(express.static(__dirname))
	app.listen(PORT, HOST)
	opn('http://127.0.0.1:1337/')
})

