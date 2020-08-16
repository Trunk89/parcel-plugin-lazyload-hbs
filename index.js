module.exports = function (bundler) {
  bundler.addAssetType("hbs", require.resolve("./lib/HBSAssetWithLazyLoading.js"));
};
