export default function (){
  vnjs.on('discord', msg=>{
    const webhook = this.package['discord']['webhook']

    var embeds = {
      "title": null,
      "description": null,
      "fields": [
        {
          "name": "isbn",
          "value": this.package['publish']['isbn'],
          "inline": false
        },
        {
          "name": "story name",
          "value": this.package['publish']['name'],
          "inline": false
        },        
        {
          "name": "player name",
          "value": this.package['player']['name'],
          "inline": false
        },
        {
          "name": "player uuid",
          "value": this.package['player']['uuid'],
          "inline": false
        },        
        {
          "name": "scene.label",
          "value": this.state.sceneName + "." + this.state.labelName,
          "inline": false
        },                           
      ]
    }

    var message = {
      "content": '',
      "username": vnjs.state.data.player.name,
      "embeds": [embeds]
    }

    if(typeof(msg)==='string'){
      message.content = msg;
      sendMessage(message, webhook);
    }

    if(typeof(msg)==='object'){
      let emb = false;
      if('title' in msg){
        emb = true;
        embeds.title = msg.title;
      }
      if('description' in msg){
        emb = true;
        embeds.description = msg.description;
      }
      if('fields' in msg){
        emb = true;
        msg.fields.forEach(function(entry) {
          embeds.fields.push(entry);
        });
      }
      if (emb){
        message.embeds = [embeds];  
      }
      if('content' in msg){
        message.content = msg.content;
      }
      sendMessage(message, webhook);    
    }

    if(typeof(msg)==='boolean' && msg===true){
      sendMessage(message, webhook);  
    }
  })
}

function sendMessage(params, url) {
  const request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader('Content-type', 'application/json');
  request.send(JSON.stringify(params));
}