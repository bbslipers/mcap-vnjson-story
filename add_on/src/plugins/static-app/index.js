import './style.css'

export default function (){
   fetch('apps/modules.json')
    .then(r=>r.json())
    .then(res => {
          if(res){
            for(let event in res){
              eventRegistration.call(this, event, res[event])
            }
          }
    })
}

function eventRegistration (event) {
  const src = `apps/${event}/index.html`
  const tpl = `<iframe src="${src}" class="vnjson__${event} vnjson__static-app component" ></iframe>`
  const $tpl = $(tpl)

  vnjs.store.screen.append($tpl)

  vnjs.on(event, data=>{
    if(data){
      $tpl.show()
    }
    else{
      $tpl.hide()
    }
  })
}