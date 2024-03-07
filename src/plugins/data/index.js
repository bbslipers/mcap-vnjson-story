import controller from "./controller";

export default function () {
    vnjs.plugins['data'] = { stringToData: controller.stringToData };
}

vnjs.on("postload", () => {
    controller.load(vnjs.package.publish.token);
});

vnjs.on("data-save", () => {
    controller.save(vnjs.state.data);
});

vnjs.on("data-set", (args) => controller.set(args));
vnjs.on("data-plus", (args) => controller.plus(args));
vnjs.on("data-minus", (args) => controller.minus(args));
vnjs.on("data-clear", (args) => controller.clear(args));