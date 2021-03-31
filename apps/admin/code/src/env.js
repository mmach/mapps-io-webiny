const config = {
    DEFAULT: {
        DEBUG: 1,
        API_URL: "https://api.mapps.io",
        SOCKET_URL: "https://api.mapps.io",
        PROXY: "https://proxy.mapps.io",
        BLOB_URL: "https://api.mapps.io"
    },
    LOCAL: {
        DEBUG: 1,
        API_URL: "https://api.mapps.io",
        SOCKET_URL: "http://localhost:3000",
        PROXY: "https://proxy.mapps.io",
        BLOB_URL: "https://api.mapps.io"
    },
    DEVELOPMENT: {
        DEBUG: 1,
        API_URL: "https://api.mapps.io",
        SOCKET_URL: "https://api.mapps.io",
        PROXY: "https://proxy.mapps.io",
        BLOB_URL: "https://api.mapps.io"
    },
    PRODUCTION: {
        DEBUG: 1,
        API_URL: "https://api.mapps.io",
        SOCKET_URL: "https://api.mapps.io",
        PROXY: "https://proxy.mapps.io",
        BLOB_URL: "https://api.mapps.io"
    }
};

const env = window.localStorage.cms_environment;
const conf = config[JSON.parse(env).name.toUpperCase()];

module.exports = global.env = { ...conf, ...process.env };
