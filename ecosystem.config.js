module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'API',
            script: 'server.js',
            watch: ["server", "front"],
            ignore_watch: ["node_modules", "front/public"],
            watch_options: {
                followSymlinks: false
            },
            env: {
                "NODE_ENV": "development",
            },
            env_production : {
                "NODE_ENV": "production"
            }
        },
        // Second application
    ],
};
