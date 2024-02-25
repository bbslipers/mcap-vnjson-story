import "./style.css";
import tpl from "./tpl.html";
import Test from './test.js';

const $tpl = $(tpl);
const test = new Test($tpl);

export default function () {
    vnjs.store.screen.append($tpl);
}

vnjs.on("test", (args) => {
    if (args) {
        test.start(args);
    } else {
        $tpl.hide();
    }
});

$tpl.find(".vnjson__test-variants").on("click", ".vnjson__variants-item", function () {
    test.clickItem(this);
});

$tpl.find(".vnjson__test-next-btn").on("click", function () {
    vnjs.exec({ next: true, test: false });
    $(".vnjson__test-result").hide();
});

$tpl.find(".vnjson__test-restart-btn").on("click", function () {
    test.reset();
    test.start(test.args);
});