const fs = require('node:fs')

const packageJsonPath = `${require.main.paths[0].split('node_modules')[0]}package.json`
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))
  console.info('postinstall: add jest-preset script')
  packageJson.scripts.test = 'npm run build && node --experimental-vm-modules node_modules/jest/bin/jest.js'
  packageJson.jest = {
    preset: '@unsync/jest-preset',
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}
