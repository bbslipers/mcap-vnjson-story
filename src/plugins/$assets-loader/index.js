import "./style.css";
import tpl from "./tpl.html";
import loader from './loader.js';

const $tpl = $(tpl);

export default function () {
    $("#screen").append($tpl);
}
/**
 * Получили vn.json
 */
vnjs.on("vnjson.mount", concatAssets);

function concatAssets (){
    for (let [scene, body] of Object.entries(vnjs.tree)) {
        vnjs.state.assets = vnjs.state.assets.concat(body.assets);
    }
    /**
     * Загрузка ресурсов происходит только тогда, когда есть ресурсы
     */
    if (vnjs.state.assets.length > 0) {
        loader.start(vnjs.state.assets)
    } else {
    /**
     * Если ресурсов нет, то эмулируем событыия, будто ресурсы есть
     * [ postlaod ] - Является важным событием, так как первый прыжок совершается
     * после этого события. Так же для коректной работы некоторых плагинов.
     * Которым требуются загруженные ресурсы.
     */
        setTimeout(() => {
            vnjs.emit("preload");
            vnjs.emit("load");
            vnjs.emit("postload");
        }, 0);
    }
};


/**
 * Отображаем прелоэдер
 */
 vnjs.on("preload", () => $tpl.css("display", "flex"));

 const loadProgress = $tpl.find('.vnjson-loader__progress')
 vnjs.on("load", (asset, len, i) => {
     const width = ( (i / (len-1)  ) * 100 )
     const roundWidth = Math.ceil(width)
 

     if(roundWidth<=100){

        loadProgress.text(`${roundWidth} %`)
     }

 });
 
 vnjs.on("postload", () => $tpl.fadeOut(300));