import "./style.css";
const $tpl = $('<div class="vnjson__brython component"></div>');

export default function (){
  vnjs.on('postload', ()=>{
    if (vnjs.package['brython-ide']) {
      init.call(vnjs);
    }
  })
}

function init (){
  const $iframe = $('<iframe id="vnjson__brython" src="data/pyide/index.html" width="758" height="430"></iframe>')
  vnjs.store.screen.append($tpl); $tpl.append($iframe);
  vnjs.on('brython', data=>{
    if(data){
      $tpl.fadeIn();
      const file = this.getDataByName(data);
      const win = document.querySelector("iframe#vnjson__brython").contentWindow;
      const url = location.origin+"/data/pyide/index.html";
      if (file === null && data != true) {
        setTimeout(()=>{
          win.postMessage({ file: data }, url);
        }, 1000);
      }else{
        setTimeout(()=>{
          win.postMessage({ file: file?.body||'' }, url);
        }, 1000);
      }
    }else{
      $tpl.fadeOut();
    }
  });
}