import './style.css';
import tpl from './tpl.html';
import TypeWrite from './TypeWrite.js';


const $tpl = $(tpl);

export default function (){
  vnjs.store.screen.append($tpl);
  const tw = new TypeWrite();
  vnjs.on('typewrite', param=>{
      if(typeof param ==='string'){
          $tpl.show();
          tw.setTask(param);
          tw.onEnd(()=>{
              $tpl.hide();
              this.exec({ next: true });
          })
      }
      else if(typeof param === 'object'){
          $tpl.show();
          tw.kb.setLocal(param.local);
          if(param.activeKeys){
            tw.kb.resetActived();
            param.activeKeys
                    .split('')
                    .forEach(char=>tw.kb.selectButton(char, 'actived', true));
          }
          tw.setTask(param.task);
          if(param.activeColor){
            tw.setActiveColor(param.activeColor);
          }
          tw.onEnd(()=>{
              $tpl.hide();
              this.exec({ next: true });
          })
      }
      else{
          $tpl.hide();
      }

  })
}