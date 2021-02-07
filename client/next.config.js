// create this file by own self to detect changes perfectly if it doesn't detect sometimes

module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
