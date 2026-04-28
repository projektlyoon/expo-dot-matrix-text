const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('@expo/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});

config.resolver.useWatchman = false;
config.watchFolders = [__dirname, root];
config.watcher = {
  ...config.watcher,
  useWatchman: false,
};
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      const url = new URL(req.url, 'http://localhost');
      const assetPrefix = '/assets/assets/';

      if (url.pathname.startsWith(assetPrefix)) {
        const assetName = decodeURIComponent(url.pathname.slice(assetPrefix.length));
        const assetPath = path.resolve(__dirname, 'assets', assetName);
        const assetsRoot = path.resolve(__dirname, 'assets');

        if (assetPath.startsWith(assetsRoot) && fs.existsSync(assetPath)) {
          res.setHeader('Content-Type', 'image/png');

          if (req.method === 'HEAD') {
            res.end();
            return;
          }

          fs.createReadStream(assetPath).pipe(res);
          return;
        }
      }

      return middleware(req, res, next);
    };
  },
};

module.exports = config;
