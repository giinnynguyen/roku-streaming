async function getDeviceConfig() {
    let deviceConfig;
    try {
        deviceConfig = require("../device.json");
    } catch (error) {
        console.error("Device configs are missing or invalid format");
        throw error;
    }

    const device = {
        ...deviceConfig,
        ip: deviceConfig.ip || deviceConfig.host,
        username: deviceConfig.username,
        password: deviceConfig.password,
    };
    device.id = device.ip;

    const requiredFields = ['ip', 'username', 'password'];
    for (const field of requiredFields) {
        if (!device[field]) {
            throw new Error(`Device config is missing required field: ${field}`);
        }
    }

    return device;
}

module.exports = { getDeviceConfig };