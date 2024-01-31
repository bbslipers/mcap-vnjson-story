import './style.css'
const tpl  = `<div class="vnjson__show-frame component">
                    <div class="vnjson__show-frame__cell"></div>
                    <div class="vnjson__show-frame__cell"></div>
                    <div class="vnjson__show-frame__cell"></div>
                    <div class="vnjson__show-frame__cell"></div>
             </div>`
export default function (){
  let $frame = $(tpl)
  vnjs.store.screen.append($frame)
  vnjs.on('show-frame', param=>{
      if(param){
          $frame.html('')
          for(let i=1; i<5;i++){
              let tplItem = $(`<div class="vnjson__show-frame__cell ${param[i]?'':'filter-blur'}" style="background-image:url('${this.getAssetByName(param.img).url}') "></div>`)
              $frame.append(tplItem)
          }
          $frame.css('display', 'flex')
      }
      else{
        $frame.hide()
      }
  })
}