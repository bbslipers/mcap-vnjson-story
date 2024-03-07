import "./style.css";

const $tpl = $('<ul class="vnjson__wiki component"></ul>');

export default function () {
    vnjs.store.screen.append($tpl);
    vnjs.on("wiki", (data) => {
        if (data) {
            $tpl.html("");
            $tpl.fadeIn();
            let list;
            if (Array.isArray(data)) {
                list = data;
            } else {
                list = data.list;
                if (data.css) {
                    $tpl.css(data.css);
                }
            }
            appendElements.call(this, list);
        } else {
            $tpl.fadeOut();
        }
    });
}

function appendElements(list) {
    let wikiStore = this.tree.$root.wiki;
    list.forEach((key) => {
        let str;
        if (typeof wikiStore[key] === "object") {
            str = `<li><span class="vnjson__wiki-key" style="color: ${wikiStore[key].color}">${key}</span> <span class="vnjson__wiki-dash">-</span> <span class="vnjson__wiki-value">${wikiStore[key].text}</span></li>`;
        } else {
            str = `<li><span class="vnjson__wiki-key">${key}</span> <span class="vnjson__wiki-dash">-</span> <span class="vnjson__wiki-value">${wikiStore[key]}</span></li>`;
        }

        $tpl.append(str);
    });
}
