// Ensure the version of tNodeJS has not exceed its end of life date

const getNodeVersion = () => {
    return process.version;
};

const getNodeEndOfLifeDates = () => {
    const endOfLife = {
        '0': '2016-12-31',
        '18': '2025-04-30'
    };

    return endOfLife;
};

/**
 * Throw error if NodeJS version has exceed end of life data
 */

const checkNodeVersion = () => {
    const endOfLife = getNodeEndOfLifeDates();

    const version = getNodeVersion();

    const match = version.match(/^v(\d+)\.(\d+)\.(\d+)$/);
    if(!match) {
        return;
    }

    const versionEndOfLife = endOfLife[match[1]];

    if(match && versionEndOfLife) {
        const d = new Date(versionEndOfLife);
        const now = new Date();
        if (d.getTime() < now.getTime()) {
            throw new Error(`Support for NodeJS ${version} ended on ${versionEndOfLife}. Please upgrade. \n`);
        }
    }
};

try {
    checkNodeVersion();
} catch (err) {
    console.error(err);
    process.exit(1);
}

process.exit(0);
