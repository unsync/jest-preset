const fs = require('fs')
const path = require('path')

const scriptName = 'test'
const scriptCommand = 'npm run build && node --experimental-vm-modules node_modules/jest/bin/jest.js'

const packageJsonPath = path.join(process.cwd(), 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

packageJson.scripts[scriptName] = scriptCommand
packageJson.jest = {
    "preset": "@unsync/jest-preset"
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))