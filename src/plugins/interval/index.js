
export default () => {
    let intervalID = null;
    vnjs.on('interval', (args) => {
        if(typeof args === "object"){
            intervalID = setInterval(() => {
                vnjs.exec(args.exec);
            }, args.timer);
        }
        else{
            clearInterval(intervalID);
        }
    })
}