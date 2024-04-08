import controller from "./controller.js";

class Switch {
    operators = [
        "===",
        "<",
        ">",
        ">=",
        "<=",
        "!==",
        "\\[\\]",
        "\\]\\[",
    ];
    dataValue = null;
    value = null;
    OPERATOR = null;
    equal = null;
    PLUGIN_DATA = null;
    constructor() {}
    parse(data) {
        this.PLUGIN_DATA = data;
        for (let equal in this.PLUGIN_DATA) {
            this.equal = equal;
            for (let i = 0; i < this.operators.length; i++) {
                const operator = this.operators[i];
                const isOperator = new RegExp(operator).test(this.equal);
                if (isOperator) {
                    this.OPERATOR = operator;
                }
            }
            if (this.OPERATOR === null) {
                return;
            }
            if (this.OPERATOR.includes("\\")) {
                this.OPERATOR = this.OPERATOR.replaceAll("\\", "");
            }

            const [key, val] = this.equal.split(this.OPERATOR);

            this.dataValue = vnjs.state.data[key.trim()];
            if (isNaN(+val)) {
                this.value = val.trim();
                if (this.value === "false") {
                    this.value = undefined;
                }
                if (this.value === "undefined") {
                    this.value = undefined;
                }
                if (this.value === "null") {
                    this.value = undefined;
                }
            } else {
                this.value = Number(val);
            }
            const execData = this.PLUGIN_DATA[this.equal];
            if(typeof this.dataValue==='string'){
                this.value = String(this.value)
            }
            controller[this.OPERATOR](this.dataValue, this.value, execData);
        }
    }
}

export default Switch;