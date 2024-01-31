
import icoPlay from './assets/icoPlay.jpg'




export default function (){

let prev = null

let INDEX = null
vnjs.on('$voice', data => {

  if(data){
    $('.vnjson__hand-left').css('background-image', `url(${icoPlay})`)
    this.store.$voice = data
    INDEX = this.state.index
    prev = data
  }
  else{
    vnjs.emit('hand-left', false)
    this.store[prev].stop()
    prev = null
  }
  if(prev){
      this.store[prev].stop()
      prev = null
  }


})

vnjs.on("vnjson.character", ctx => {
  if( INDEX ){ 
    const name = this.getCurrentLabelBody()[INDEX].$voice
    this.store[name].stop();
    vnjs.emit('hand-left', false)
    prev = null
    INDEX = null
  }
})

vnjs.on('voicePlay', data => {

  if(INDEX){
      if(prev){
          this.store[prev].stop()
          
      } 
      const name = this.getCurrentLabelBody()[INDEX].$voice

      this.store[name].play()
  }
  else{
    //const name = this.getCurrentLabelBody()[INDEX].$voice
    //this.store[name].stop()
    prev = null
  }
})


  $('.vnjson__hands').on('mouseover', '.vnjson__hand-left', function (){
      $(this).css('opacity', 0.5)
  })
  $('.vnjson__hands').on('mouseout', '.vnjson__hand-left', function (){
      $(this).css('opacity', 1)
  })


  
  $('.vnjson__hands').on('click', '.vnjson__hand-left', e => {
     if(INDEX===this.state.index){
        vnjs.emit('voicePlay')
     }
  })
};