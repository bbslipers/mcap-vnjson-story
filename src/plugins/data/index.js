import controller from "./controller";

export default function () {

    vnjs.plugins['data'] = { stringToData: controller.stringToData };

}
/**
 * events
 */
vnjs.on("postload", () => {
    controller.load(vnjs.package.publish.token);
});

vnjs.on("data-set", (args) => controller.set(args));
vnjs.on("data-clear", (args) => controller.clear(args));
vnjs.on("data-save", () => {
    controller.save(vnjs.state.data);
});

/**
 * deprecated
 */
vnjs.on("set-data", (args) => {
    console.warn("[set-data] is deprecated. Use [data-set]");
    controller.set(args);
});
vnjs.on("clear-data", () => {
    console.warn("[clear-data] is deprecated. Use [data-clear]");
    controller.clear();
});
