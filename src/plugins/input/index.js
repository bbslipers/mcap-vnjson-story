import tpl from "./tpl.html";
import "./style.css";

const $tpl = $(tpl);
const input = $tpl.find(".vnjson__input-wrapper input");
let _args = null;
let character = null;
/**
 * setup
 */
export default function () {
    vnjs.store.screen.append($tpl);

    /**
     * click
     */
    $tpl.find(".vnjson__input-btn").on("click", () => clickHandler());
}

vnjs.on("input-name", handler);
vnjs.on("input-data", handler);
/**
 * deprecated
 */
vnjs.on("set-name", (args) => {
    console.warn("[set-name] is deprecated. Use [input-name]");
    handler(args);
});
/**
 * event handler
 */
function handler (args){
    character = vnjs.getCharacterById(args);
    if (args) {
        _args = args;
        if(character){
            input.val(character.name)
        }
        else{   
            const _varData = vnjs.state.data[args]
            input.val(_varData)
        }
        $tpl.css("display", "flex");
    } 
    else {
        $tpl.hide();
    }
}
/**
 * Обработка клика по кнопке ввода текста
 */
function clickHandler () {
    
    $tpl.fadeOut();
    
    if (character) {
        character.name = input.val();
    } 
    else {
        vnjs.emit("data-set", {
            [_args]: input.val(),
        });
    }
    input.val("");
    vnjs.emit('next', true);
}

