import tpl from "./tpl.html";
import "./style.css";

let $tpl = $(tpl);
export default function() {
    vnjs.store.screen.append($tpl);
}

vnjs.on('paint-board', imgID=>{
  if (vnjs.package['paint-board'] && imgID){
    $tpl.show();
    let url = vnjs.getAssetByName(imgID).url.split('');
    url.shift();
    let IMG = location.protocol+'//'+location.host+'/s'+url.join('');
    let win = document.querySelector("iframe#vnjson__paint-board").contentWindow;
    win.postMessage({ IMG }, location.origin+"/data/board/index.html");
  }
  else{
    $tpl.fadeOut();
  }
})