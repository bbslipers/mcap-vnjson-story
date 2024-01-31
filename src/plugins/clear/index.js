export default function (){

  vnjs.on('clear', param=>{
    if(param==='all'){
      $('.component').toArray().map(function(component){
        $(component).hide()

      })
      this.exec({
          scene: false,
          'dialog-box': 'clear'
      })

      Object.values(vnjs.store).map(asset=>{
        if(asset.hasOwnProperty("_muted") ){
          asset.stop()
        }
      })
    }

  })
}