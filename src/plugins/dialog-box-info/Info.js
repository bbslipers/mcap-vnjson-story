// character.info
class Info {
    openModal = false;

    constructor($info, $avatar) {
        this.$info = $info;
        this.$avatar = $avatar;
        this.$text = this.$info.find(".dialog-box__info-text");
        this.mount();
    }
    mount() {
        this.$info.on("mousedown", () => this.close());
    }
    open() {
        if (this.$text.text() === "") return;
        if (this.$text.text() === "undefined") return;
        this.$info.css("display", "flex");
        this.openModal = true;
        this.hideBorder();
    }
    close() {
        this.$info.hide();
        this.openModal = false;
    }
    hideBorder() {
        this.$avatar.css("border-color", "transparent");
    }
    toggle() {
        if (this.openModal) {
            this.close();
        } else {
            this.open();
        }
    }
    print(data) {
        this.$text.html(data);
    }
    addBorder(borderColor) {
        this.$avatar.css("border-color", borderColor);
        this.$info.css("border-color", borderColor);
    }
    removeBorder() {
        this.$avatar.css("border-color", "transparent");
        this.$info.css("border-color", "transparent");
        this.close();
    }
    controlPadding(MODE) {
        if (MODE === "mode-classic") {
            this.$info.css("bottom", "205px");
        } else {
            this.$info.css("bottom", "5px");
        }
    }
}

export default Info;
