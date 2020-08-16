const HbsAsset = require("parcel-plugin-handlebars/lib/HbsAsset");

class HbsAssetWithLazyLoading extends HbsAsset {
  collectDependencies() {
    super.collectDependencies();
    this.ast.walk((domNode) => {
      if (domNode.attrs) {
        for (let attr in domNode.attrs) {
          if (attr === "data-background-image" || attr === "data-bg") {
            domNode.attrs[attr] = `url('${super.collectSrcSetDependencies(
              domNode.attrs[attr].replace("url('", "").replace("')", "")
            )}')`;
            this.isAstDirty = true;
            continue;
          }
          if (attr === "data-src" || attr === "data-srcset") {
            domNode.attrs[attr] = super.collectSrcSetDependencies(
              domNode.attrs[attr]
            );
            this.isAstDirty = true;
            continue;
          }
        }
      }

      return domNode;
    });
  }
}

module.exports = HbsAssetWithLazyLoading;
