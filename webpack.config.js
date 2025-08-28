module.exports = (options) => ({
  ...options,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000, // Critical for Docker file watching
    ignored: /node_modules/,
  },
});
