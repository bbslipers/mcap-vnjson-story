export default function (asset) {
    const _vnjs = this
    const char = this.getCharacters()[0]
    if(asset) {
        const img = new Image()
        img.onload = function () {
          const str = `image: ${asset}<br>width: ${this.width}px<br>height: ${this.height}px`
          _vnjs.emit('vnjson.info', str)
        }
        img.src = vnjs.getAssetByName(asset).url
    }


}