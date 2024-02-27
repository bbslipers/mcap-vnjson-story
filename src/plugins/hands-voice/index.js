import voice_jpg from './assets/voice.jpg'

export default function (){
  let prev = null
  let INDEX = null

  vnjs.on('hands-voice', data => {
    if(data){
      $('.vnjson__hand-left').css('background-image', `url(${voice_jpg})`)
      this.store.handsvoice = data
      INDEX = this.state.index
      prev = data
    }else{
      vnjs.emit('hand-left', false);
      this.store[prev].stop();
      prev = null;
    }
    if(prev){
      this.store[prev].stop();
      prev = null;
    }
  })

  vnjs.on("vnjson.character", ctx => {
    if(INDEX){ 
      const name = this.getCurrentLabelBody()[INDEX]['hands-voice'];
      this.store[name].stop();
      vnjs.emit('hand-left', false);
      prev = null;
      INDEX = null;
    }
  })

  vnjs.on('voice-play', data => {
    if(INDEX){
      if(prev){
        this.store[prev].stop();      
      }  
      const name = this.getCurrentLabelBody()[INDEX]['hands-voice'];
      this.store[name].play();
    }else{
      prev = null
    }
  })

  $('.vnjson__hands').on('mouseover', '.vnjson__hand-left', function (){
    $(this).css('opacity', 0.5);
  })

  $('.vnjson__hands').on('mouseout', '.vnjson__hand-left', function (){
    $(this).css('opacity', 1)
  })
    
  $('.vnjson__hands').on('click', '.vnjson__hand-left', e => {
    if(INDEX===this.state.index){
      vnjs.emit('voice-play')
    }
  })
};