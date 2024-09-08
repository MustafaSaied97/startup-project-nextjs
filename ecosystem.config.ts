const ecosystem = {
  apps: [
    {
      name: 'Market-bff',
      script: 'npm',
      args: 'start',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

// Export the configuration using `export default`
export default ecosystem;
