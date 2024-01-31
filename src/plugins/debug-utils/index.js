import "./style.css";
import tpl from "./tpl.html";
/**
 * color picker
 */
import "./lib/color-picker/color.css";
import "./lib/color-picker/color.js";
/**
 * etc
 */
import copyTextToClipboard from "./clipboard.js";
import pluginsSnipet from "./plugins-snipet.js";
import screenShot from "./screenshot.js";
/**
 * PLUGINS
 */
import getImageSize from "./plugins/img-size.js";
import cmdPlayerPlugin from "./plugins/cmd-player.js";
import cmdServerPlugin from "./plugins/cmd-server.js";
import queryGetPlugin from "./plugins/query-get.js";
import outputDataPlugin from "./plugins/data.js";
/**
 * INIT
 */
let cid = "$";
export default function () {
    const $tpl = $(tpl);
    $(".game").append($tpl);

    $(".debug__inner-reply").on("click", () => {
        cid = $(".debug__character").val();
        const reply = $(".debug__reply").val().trim();
        const objReply = jsyaml.load(reply);
        if (cid === "") cid = "$";

        this.exec({ [cid]: objReply });
    });

    /*
     * delay
     */

    vnjs.on("postload", () => {
        // delay
        const dBox = this.package?.["dialog-box"];
        $(".debug__delay").val(dBox?.delay || 0);
        $(".debug__alpha").val(dBox?.alpha || 1);
        // screenshot
        screenShot.WEBHOOK = "";
        screenShot.HOST = this.package.publish.host;
    });

    $(".debug__delay").on("change", function () {
        vnjs.plugins["dialog-box"].delay = $(this).val();
    });
    $(".debug__alpha").on("change", function () {
        vnjs.plugins["dialog-box"].alpha = $(this).val();
    });
 
    /**
     * color-picker
     */
    $("#debug__color-picker").on("change", function () {
        const value = $(this).val();

        copyTextToClipboard(value);
    });

    $("#debug__color-picker").spectrum({
        color: "#455e61",
        type: "text",
    });
    /**
     * Клик по снипету в реплике
     */
    $(".debug-btn--character-snipet").on("click", function () {
        const val = pluginsSnipet["character"];
        $(".debug__reply").val(val);
    });

    const $pluginValue = $(".debug__plugin--value");

    /**
     * degug plugins
     */
    const devPlugins = [
        "img-size",
        "cmd-player",
        "cmd-server",
        "cmd-mc-get",
        "data",
    ];
    /**
     * Выводим список плагинов
     */
    const $pluginSelect = $(".debug-plugin__select");
    Object.keys(pluginsSnipet).forEach((pluginItem, index) => {
        const isDev = devPlugins.includes(pluginItem);
        let tpl = null;
        if (isDev) {
            tpl = `<code class="debug-plugin__name debug-plugin__name--dev" data-plugin="vnjson.${pluginItem}">
                            ${pluginItem}
                      </code>`;
        } else {
            tpl = `<code class="debug-plugin__name ${
                index === 0 ? "debug-plugin__name--active" : ""
            }" data-plugin="${pluginItem}">
                            ${pluginItem}
                      </code>`;
        }
        $pluginSelect.append(tpl);
    });
    /**
     * выбираем название плагина
     */
    let pluginName = "scene";
    const resetActivePluginName = () => {
        $(".debug-plugin__select .debug-plugin__name").each(function (node) {
            $(this).removeClass("debug-plugin__name--active");
        });
        $pluginValue.val("");
    };
    $pluginSelect.on("click", ".debug-plugin__name", function () {
        resetActivePluginName();
        $(this).addClass("debug-plugin__name--active");
        pluginName = $(this).data("plugin");
    });

    /**
     * кликаем по кнопке snippet
     */
    $(".debug-btn--value").on("click", function () {
        const snippet = pluginsSnipet[pluginName.replace('vnjson.', "")]

        $pluginValue.val(snippet);
    });

    /**
     * Кликаем по кнопке [ выполнить плагин ]
     */
    $(".debug__show-asset").on("click", function () {
        let pluginValue = jsyaml.load($pluginValue.val().trim());
        vnjs.exec({
            [pluginName]: pluginValue,
        });
    });
    /**
     * Показываем и скрываем [ dialog-box ]
     */
    let flagDB = 0;
    $(".debug__show-dbh").on("click", function () {
        switch (flagDB){
            case 0:
                vnjs.exec({ "dialog-box": 'fullscreen' });
                flagDB = 1;
                break;
            case 1:
                vnjs.exec({ "dialog-box": false });
                flagDB = 2;
                break;
            case 2:
                vnjs.exec({ "dialog-box": 'classic' });
                flagDB = 0;
                break;
        }
    })
    /**
     * Screenshot
     */
    //$(".debug__inner-screenshot").on("click", () => screenShot.nodeToCanvas());
    /**
     * PLUGINS
     */
    /**
     * get original image size plugin
     */
    vnjs.on("vnjson.img-size", getImageSize);
    /**
     * Minecraft CMD client
     */
    vnjs.on("vnjson.cmd-player", cmdPlayerPlugin);
    /**
     * Minecraft CMD server
     */
    vnjs.on("vnjson.cmd-server", cmdServerPlugin);
    /**
     * Minecraft query GET
     */
    vnjs.on("vnjson.cmd-mc-get", queryGetPlugin);
    /**
     * Output data
     */
    vnjs.on("vnjson.data", outputDataPlugin);
}
