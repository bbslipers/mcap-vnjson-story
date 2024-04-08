import "./style.css";
import tpl from "./tpl.html";

let name = null;
let onClick = null;
let character = null;

const $tpl = $(tpl);
const input = $tpl.find(".vnjson__input-wrapper input");

export default function () {
    vnjs.store.screen.append($tpl);
    $tpl.find(".vnjson__input-btn").on("click", () => clickHandler());
}

vnjs.on("data-input", handler);
vnjs.on("name-input", handler);

function handler(args) {
    if (args){
        name = args.name;
        if (name){
            character = vnjs.getCharacterById(name);
            if (character) {
                input.val(name||("id: " + character.id + " | name: " + name));    
            }else{
                input.val(vnjs.state.data[name]);    
            }
            $tpl.css("display", "flex");
        }
        if (args.onClick){
            onClick = args.onClick;
        }
    }else{
        input.val("");
        $tpl.css("display", "none");
    }
}

function clickHandler () {
    if (character) {
        character.name = input.val();
    }else{
        vnjs.emit("data-set", {
            [name]: input.val(),
        });
    }
    input.val("");
    $tpl.css("display", "none");
    if (onClick) {
        vnjs.exec(onClick);
    }    
}