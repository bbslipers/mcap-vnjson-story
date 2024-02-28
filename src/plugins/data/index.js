import controller from "./controller";

export default function () {
    vnjs.plugins['data'] = { stringToData: controller.stringToData };
}

vnjs.on("postload", () => {
    controller.load(vnjs.package.publish.token);
});

vnjs.on("data-set", (args) => controller.set(args));
vnjs.on("data-clear", (args) => controller.clear(args));
vnjs.on("data-save", () => {
    controller.save(vnjs.state.data);
});