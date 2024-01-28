const fs = require('fs')
const path = require('path')

const scriptName = 'test'
const scriptCommand = 'npm run build && node --experimental-vm-modules node_modules/jest/bin/jest.js'

console.info(`postinstall: starting`)

const packageJsonPath = require.main.paths[0].split('node_modules')[0] + 'package.json'
if(!fs.existsSync(packageJsonPath)) {
    console.info(`postinstall: ${packageJsonPath} do not exist`)
    return
}
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

if(packageJson.name === '@unsync/jest-preset') {
    console.info(`postinstall: do not run on ${packageJson.name}`)
    return
}

console.info('postinstall: add jest-preset script')
packageJson.scripts[scriptName] = scriptCommand
packageJson.jest = {
    "preset": "@unsync/jest-preset"
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))