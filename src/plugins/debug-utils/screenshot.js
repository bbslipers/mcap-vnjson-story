class ScreenShot {
    WEB_HOOK= 'https://discord.com/api/webhooks/1013006725558829126/JCPnV-jnWmNHuLaBg5F7bAvAub-9n56EgF2PJJ22uSRVAREvHh_7BNlGLaiKO5zAQqyT';
    HOST = null;
    avatar_url = "https://avatars.githubusercontent.com/u/17809187?s=200&v=4";
    content = "";
    username = "Vnjson";
    imageData = null;
    extName = "jpeg";
    constructor() {}
    get imageURL() {
        return `${this.HOST}/screenshots/${this.imageName}`;
    }
    get URL() {
        return `${this.HOST}/api/vnjson/screenshot`;
    }
    nodeToCanvas() {
        html2canvas(vnjs.store.screen.get(0)).then((canvas) => {
            //this.sendToDiscord(canvas.toDataURL())
          
           canvas.toBlob((blob) => {
                    this.sendToDiscord(blob)
                    // this.saveImageToServer(blob)
            }, `image/${this.extName}`);
        });
    }
    get imageName() {
        return String(new Date().getTime()) + "." + this.extName;
    }
    saveImageToServer(blob) {
        //this.HOST = 'http://localhost:8081'

        const formData = new FormData();
        formData.append("image", blob, this.imageName);

        fetch(this.URL, {
            method: "POST",
            body: formData,
        })
            .then((r) => {
                console.log(r);
            })
            .catch((err) => {
                console.error(err);
                vnjs.emit("error", {
                    ru: `Сервер не отвечает <font color="deepskyblue">${this.HOST}</font>`,
                    en: `Server not responding <font color="deepskyblue">${this.HOST}</font>`,
                });
            });
    }
    sendToDiscord(blob) {
        const body = {
            avatar_url: this.avatar_url,
            content: this.content,
            username: this.username,
            embeds: [
                {
                    description: "$html('.pop-up-discord__textarea').value",
                    
                    image: {
                        url: this.avatar_url,
                       // type: 'image/png'
                    },
                },
            ],
        };
      
        const params = {
            method: "POST",
            headers: {
                //"Content-type": "application/json",
                "Content-Type": "multipart/form-data"
            },
  
            body: JSON.stringify(body),
        }

        fetch(this.WEB_HOOK, params)
            .then((res) => {})
            .catch((err) => {
                console.error(err);
                vnjs.emit("error", {
                    ru: `Нет доступа к webhook <font color="deepskyblue">${this.WEB_HOOK}</font>`,
                    en: `No access to <font color="deepskyblue">${this.WEB_HOOK}</font>`,
                });
            });
    }
}

export default new ScreenShot();
