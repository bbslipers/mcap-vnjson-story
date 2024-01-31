import "./style.css";
import "./hl.css";
import tpl from "./tpl.html";
import map from "./map.js";

document.addEventListener("DOMContentLoaded", () => {
    hljs.highlightAll();
});
/**/
export default function () {
    const $tpl = $(tpl);

    vnjs.store.screen.append($tpl);

    vnjs.on("term", (param) => {
        if (param === true) {
            $tpl.fadeIn();
        } else if (param) {
            let data = this.getDataByName(param);

            if (/\./.test(param)) {
                if (!data) {
                    console.error("Data file not found");
                    console.warn(
                        this.state.sceneName +
                            "." +
                            this.state.labelName +
                            "." +
                            this.state.index
                    );
                } else {
                    $tpl.find("pre code").removeAttr("class");
                    let str = param.split(".");
                    let langName = str[1];
                    let val = map[langName];
                    if (val) {
                        langName = val;
                    }
                    $tpl.find("pre code").css({
                        overflow: "auto",
                        padding: 10,
                    });
                    $tpl.find("pre code")
                        .addClass("language-" + langName)
                        .addClass("hljs");
                    let html = hljs.highlight(data.body, {
                        language: langName,
                    }).value;
                    $tpl.find("pre code").html(html);
                    // yaml reply from Norrator
                    $tpl.find("pre code .hljs-string")
                        .toArray()
                        .map((str) => {
                            if ($(str).html() === "$:") {
                                $(str).addClass("hljs-reply");
                            }
                        });
                    $tpl.fadeIn();
                }
            } else {
                if (param === "clear") {
                    $tpl.find("pre code").empty();
                } else {
                    let img = $(
                        `<img src=${vnjs.getAssetByName(param).url} />`
                    );
                    $tpl.find("pre code").empty();
                    $tpl.find("pre code").css("overflow", "hidden");
                    $tpl.find("pre code").append(img);
                    $tpl.fadeIn();
                }
            }
        } else {
            $tpl.hide();
            $tpl.find("pre code").removeAttr("class");
        }
    });
}
