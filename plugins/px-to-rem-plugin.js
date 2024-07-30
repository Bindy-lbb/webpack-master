const postcss = require('postcss');
const pxtorem = require('postcss-pxtorem');

class PxToRemPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('PxToRemPlugin', (compilation, callback) => {
      const processCSS = (css) => {
        return postcss([pxtorem(this.options)])
          .process(css, { from: undefined })
          .then(result => result.css);
      };

      const assets = compilation.assets;

      const cssFiles = Object.keys(assets).filter(filename => filename.endsWith('.css'));

      Promise.all(
        cssFiles.map(filename => {
          const asset = assets[filename];
          const source = asset.source();

          return processCSS(source).then(processedCSS => {
            assets[filename] = {
              source: () => processedCSS,
              size: () => processedCSS.length
            };
          });
        })
      ).then(() => callback())
        .catch(err => callback(err));
    });
  }
}

module.exports = PxToRemPlugin;
