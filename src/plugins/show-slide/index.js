import './style.css'


const $tpl = $(`<img class="screen-vnjson__slide component"/>`)
export default function (){
  vnjs.store.screen.append($tpl)
  vnjs.on('slide', id=>{
    $tpl.attr('src', null)
    if(typeof id==='string'){
        $tpl.attr('src', vnjs.getAssetByName(id).url).show()
    }
    else if(typeof id==='object'){
      /*
       * id.name
       * id.css
       * id.url
       */
      if(id.hasOwnProperty('css')){
        $tpl.css(id.css)
        $tpl.attr('src', id.name).show()
      }

      if(id.hasOwnProperty('url')){
        $tpl.attr('src', id.url).fadeIn()
      }
      else{
        $tpl.attr('src', vnjs.getAssetByName(id.name).url).show()
      }
      /*
      .css(id.css)
       */

    }
    else{
      $tpl.attr('src', null).hide()
    }   
  })

}