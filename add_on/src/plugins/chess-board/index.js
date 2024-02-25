import tpl from "./tpl.html";
import './style.css'

let $tpl = $(tpl);
export default function () {
  vnjs.store.screen.append($tpl);
  $tpl.hide();
}

vnjs.on('chess-board',fen=>{
  if (vnjs.package['chess-board'] && fen) {
    $tpl.show();
    let win=document.querySelector("iframe#vnjson__chess").contentWindow;
    win.postMessage({ fen },location.origin+"/data/chess/index.html");
  } else {
    $tpl.hide();
  }
})