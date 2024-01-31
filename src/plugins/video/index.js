import './video.css';
import './style.css';
import tpl from './tpl.html';
export default function (){

  const $tpl = $(tpl);
  vnjs.store.screen.append($tpl);

  const options = {
    responsive: true,
    controls: false,
    autoplay: false,
    preload: 'auto'
  };



  const player = videojs('vnjson__video', options);
  player.on('error', function(err) {
    videojs.log(err);
  });
  let onEndObj;
  player.on('ended', ()=>{
    $tpl.fadeOut();
    if(onEndObj){
      
      this.exec(onEndObj);
    }
  });

  vnjs.on('video', param=>{
    onEndObj = null;
    if(typeof param==='object'){
        const asset = vnjs.getAssetByName(param.name);
        player.src(asset.url);
        if(param.css){
          $tpl.find('.video-js').css(param.css);
        }
        if(param.volume<=0){
          player.volume(param.volume)
        }

        player.ready( () => {
            
              player.play();
        });
        
        if(param.onEnd){
          onEndObj = param.onEnd;
        }
        $tpl.fadeIn();
    }
    else if(typeof param==='string'){
        switch (param){
          case 'pause':
                player.pause();
            break;
          case 'play':
                player.play();
            break;
          case 'stop':
              hide()
            break;
          default:
              const asset = vnjs.getAssetByName(param);
              player.src(asset.url);
              player.ready( () => {
                 player.play()
              });    
              $tpl.fadeIn()
        }
    } 
    else{
      hide()
    }
  })
  function hide (){
    player.pause();
    $tpl.fadeOut();
  }


}
