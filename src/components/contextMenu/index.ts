import { App } from "vue";
import ContextMenu from "./src/contextMenu";

const install = (app: App): void => {
  app.config.globalProperties.$contextMenu = ContextMenu;
};

export default { install };
