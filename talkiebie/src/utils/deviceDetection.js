import UAParser from '@51degrees/ua-parser-js';

const RESOURCE_KEY = 'AQRq24Qg0-fedkU230g';
const getDeviceDetails = async () => {
    try {
        console.log('hello device');
        const result = await UAParser(RESOURCE_KEY);
        console.log(result);
        const device = result.device;

        return {
            manufacturer: device.hardwarevendor || device.vendor,
            model: device.hardwarename || device.hardwaremodel || device.model,
            deviceType: device.devicetype || device.type,
            os: device.platformname || device.os?.name,
            osVersion: device.platformversion || device.os?.version,
            browser: device.browsername || device.browser?.name,
            browserVersion: device.browserversion || device.browser?.version
        };

    } catch (error) {
        console.error('Device detection failed:', error);
        return null;
    }
};
export default getDeviceDetails;