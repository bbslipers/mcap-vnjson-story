export default function (){

}

vnjs.on("preload", () => {
    const fontName = vnjs.package["font-family"];
    fontLoad(fontName, '#screen')
});

function fontLoad (fontName, selector){
    const fontAsset = vnjs.state.assets.find(
        (asset) => asset.name === fontName
    );
    if(!fontAsset){
        document.querySelector(selector).style.fontFamily = `"${fontName}", Arial`;
        return
    }
    const junction_font = new FontFace(fontAsset.name, `url(${fontAsset.url})`);
    junction_font
        .load()
        .then((loaded_face) => {
            document.fonts.add(loaded_face);
            document.querySelector(selector).style.fontFamily = `"${fontAsset.name}", Arial`;
        })
        .catch((error) => console.error(error));
}

vnjs.plugins['font-load'] = fontLoad