import * as fs from 'fs'

export const writeToFile = (fileName: string, stringToWrite: string) => {
	fs.writeFileSync(fileName, stringToWrite)
}
