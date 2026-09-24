const path = require('path');
const { getDeviceConfig } = require('./utils/roku-device-utils');
const rokuDeploy = require('roku-deploy');

const projectRoot = path.resolve(__dirname, '..');

async function build() {
    const device = await getDeviceConfig();
    const result = await rokuDeploy.deploy({
        host: device.ip,
        username: device.username,
        password: device.password,
        rootDir: path.join(projectRoot, 'source'),
        outDir: path.join(projectRoot, 'out'),
        outFile: 'roku-streaming',
        files: [
            'source/**/*',
            'components/**/*',
            'images/**/*',
            'manifest'
        ]
    });
    console.info(`Sideloaded zip to ${device.ip}`, result.message || '');
}

build().then(() => {
    console.info('************************** BUILD SUCCESS **************************');
    process.exit(0);
}).catch((error) => {
    console.error('************************** BUILD FAILED **************************');
    console.error(error);
    process.exit(1);
});