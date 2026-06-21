const os = require("os");

const SELECTED_ENV_KEYS = [
  "USER",
  "USERNAME",
  "HOME",
  "USERPROFILE",
  "SHELL",
  "PATH",
  "NODE_ENV",
  "COMPUTERNAME",
  "PROCESSOR_ARCHITECTURE"
];

function safeValue(getValue, fallback = "unknown") {
  try {
    const value = getValue();
    return value === undefined || value === null || value === "" ? fallback : value;
  } catch (error) {
    return fallback;
  }
}

function collectSelectedEnv() {
  return SELECTED_ENV_KEYS.reduce((env, key) => {
    env[key] = process.env[key] || null;
    return env;
  }, {});
}

function getSystemInfo() {
  return {
    os: {
      type: safeValue(() => os.type()),
      release: safeValue(() => os.release()),
      version: safeValue(() => os.version()),
      platform: safeValue(() => os.platform())
    },
    cpuArchitecture: safeValue(() => os.arch()),
    hostname: safeValue(() => os.hostname()),
    nodeVersion: safeValue(() => process.version),
    platform: {
      processPlatform: safeValue(() => process.platform),
      processArch: safeValue(() => process.arch)
    },
    homeDirectory: safeValue(() => os.homedir()),
    environment: collectSelectedEnv()
  };
}

module.exports = getSystemInfo;

