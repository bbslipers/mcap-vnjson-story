const exclude = ["score", "player", "pushStore"];

export default function (asset) {
    const data = {};
    for (let key in this.state.data) {
        if (!exclude.includes(key)) {
            data[key] = this.state.data[key];
        }
    }
    const _data = jsyaml.dump(data);
    vnjs.emit("vnjson.info", _data);
}
