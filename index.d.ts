import { App } from "vue";

declare module 'vue3-context-menu' {
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Show a ContextMenu .
     * @param options The options of this ContextMenu
     */
    $contextmenu: (options : any) => void;
  }
}

declare const ContextMenu: {
  install: (app: App<Element>) => void
};

export default ContextMenu;
