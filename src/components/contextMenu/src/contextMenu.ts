import { createVNode, render, VNode } from "vue";
import ContextMenuConstructor from "./index.vue";
import {
  IRightMenu,
  IRightMenuOptions,
  IRightMenuHandle,
  IRightMenuParams,
} from "./types";

const PopupManager = {
  nextZIndex() {
    return 1;
  },
};

let instance: IRightMenuHandle | null;

const ContextMenu: IRightMenu = function (
  opts: IRightMenuParams = {} as IRightMenuParams
): IRightMenuHandle {
  if (instance) {
    instance.close();
    instance = null;
  }

  let options: IRightMenuOptions = <IRightMenuOptions>opts;

  options = {
    ...options,
    list: options.list,
    zIndex: PopupManager.nextZIndex(),
  };

  const container = document.createElement("div");

  const vm: VNode = createVNode(ContextMenuConstructor, options);

  render(vm, container);
  document.body.appendChild(container.firstElementChild as any);

  if (vm.props) {
    //  回收内存
    vm.props.onDestroy = close;
  }

  function close(): void {
    options.onClose?.(vm);
    render(null, container);
  }

  instance = {
    close,
  };

  return instance;
} as any;

export default ContextMenu;
