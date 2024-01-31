import './style.css'

let selectedElement = null;
const $tpl = $('<div class="drag-items component"></div>');

export default function (){
  vnjs.store.screen.append($tpl);
  vnjs.on('drag-items', data=>{
    if (data) {
      $tpl.show();
      renderItems.call(this, data);
    } else {
      $tpl.hide();
    }
  });

  $tpl.on('mousedown', (e) => {
    if (selectedElement===null) {
      return;
    };
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    $(selectedElement).css({top: y-4+'px', left: x-4+'px'});
    selectedElement = null;
  });
}

function renderItems (data){
  $tpl.empty();
  const top = data.top;
  const left = data.left;
  const nodeHeight = 50;
  const _data = [...data.items]
  const maxLength = _data.sort((a, b) => b.length - a.length)[0].length;
  const maxWidth = 10 * maxLength;
  data.items.forEach((item, index)=>{
    const str = $(`<div class="drag-items__item">${item}</div>`);
    str.css({
      top: `${ top + ( index*nodeHeight ) }px`,
      left: left+'px',
      width: maxWidth+'px'
    });
    str.on('click', function (e){
      selectedElement = this;
    });
    $tpl.append(str);
  });
}

