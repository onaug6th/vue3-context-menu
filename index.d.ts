import { App } from "vue";
import { IRightMenuOptions } from "./src/components/contextMenu/src/types"

declare module 'vue3-context-menu' {
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * @param options
     */
    $contextmenu: (options : IRightMenuOptions) => void;
  }
}

declare const ContextMenu: {
  install: (app: App<Element>) => void
};

export default ContextMenu;
