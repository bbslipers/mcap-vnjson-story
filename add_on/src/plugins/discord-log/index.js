
export default function (){
let webhook;
const avatar_url = 'https://avatars.githubusercontent.com/u/17809187?s=200&v=4'

vnjs.on('postload', ()=>{
  if(this.package){
    let discordLogParam = this.package['discord-log'];
    if(!discordLogParam) return;
    webhook = discordLogParam.webhook;
    //avatar_url = discordLogParam.avatar_url
  }
})


vnjs.on('discord-log', msg=>{
  var content = null
  if(typeof(msg)==='string'){
    content = this.package.name+' [ '+this.state.sceneName+'.'+this.state.labelName+' ]  '+ msg
  }
  else{
    content = this.package.name+' [ '+this.state.sceneName+'.'+this.state.labelName+' ]'
  }

      const params = {
        username: vnjs.state.data.player.name,
        avatar_url,
        content
      }

  sendMessage(params, webhook) 
})


}


function sendMessage(params, url) {
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(params));
}
