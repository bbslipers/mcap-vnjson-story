import './style.css'
import Content from './content.js'
import content_jpg from './assets/content.jpg'

const $tpl = $(`<ul class="vnjson__stage component"></ul>`);

export default function (){
  const content = new Content(this, $tpl);
  vnjs.store.screen.append($tpl);

  vnjs.on('content', data => {
    if(data){
      content.render();
      content.show();
    }else{
      content.hide();
    }
  })

  vnjs.on('content-switch', data => {
    content.switchItem(data);
  })

  $('.vnjson__hands').on('mouseover', '.vnjson__hand-right', function (){
    $(this).css('opacity', 0.5);
  })
  $('.vnjson__hands').on('mouseout', '.vnjson__hand-right', function (){
    $(this).css('opacity', 1);
  })

  $('.vnjson__hand-right').css('background-image', `url(${content_jpg})`)
 
  $('.vnjson__hands').on('click', '.vnjson__hand-right', e => {
    if(content.open){
      vnjs.emit('content', false );
      content.open = false;
    }else{
      vnjs.emit('content', true );
      content.open = true;
    }
  })

  $tpl.on('click', '.stage-item', function (){
    const label = $(this).data('label');
    content.selectItem(label);
  })

  vnjs.on('dialog-box.click', () => {
    content.hide();
  })
}