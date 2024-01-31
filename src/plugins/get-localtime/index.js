import Time from './Time.js';

export default function (){
    const time = new Time('localtime');
    const date = new Time('localdate');
    vnjs.on('get-localtime', (args) => time.parse(args) )  
    vnjs.on('get-localdate', (args) => date.parse(args) )  
    
}

