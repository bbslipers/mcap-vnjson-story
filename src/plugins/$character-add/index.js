export default function (){
  vnjs.on('character', data=>{
    if (!data.hasOwnProperty("id")) {
      return;
    }

    let character = vnjs.getCharacterById(data.id);

    if (typeof character === 'undefined'){
      if (!data.hasOwnProperty("nameColor")) {
        data.nameColor = 'white';
      }
      if (!data.hasOwnProperty("replyColor")) {
        data.replyColor = 'white';
      }
      character = data;
      
      vnjs.tree.$root.characters.push(character);
      vnjs.on(character.id, reply => {
        vnjs.state.character = character;
        vnjs.emit("vnjson.character", character, reply);
      })
    }else{
      if (data.hasOwnProperty("name")) {
        character.name = data.name;
      }
      if (data.hasOwnProperty("avatar")) {
        character.avatar = data.avatar;
      }      
      if (data.hasOwnProperty("nameColor")) {
        character.nameColor = data.nameColor;
      }
      if (data.hasOwnProperty("replyColor")) {
        character.replyColor = data.replyColor;
      }
    }
  })
}