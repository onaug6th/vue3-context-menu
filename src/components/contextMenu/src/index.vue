<template>
  <div ref="contextMenu" v-clickoutside="close" :style="{ zIndex }" class="context-menu">
    <div v-for="(menuItem, menuIndex) in list" class="menu-item" :key="menuIndex" @click="menuClick(menuItem)">
      <span>{{ menuItem.text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, PropType, nextTick } from 'vue';
import { IRightMenuListItem } from './types';

export default defineComponent({
  name: 'contextMenu',
  directives: {
    clickoutside: {
      beforeMount(el, binding) {
        el.handler = (e: Event) => {
          if (el.contains(e.target)) {
            return false;
          }
          // 存在自定义指令函数则执行
          binding.value();
        };
        document.addEventListener('click', el.handler);
      },
      unmounted(el) {
        document.removeEventListener('click', el.handler);
      }
    }
  },
  props: {
    event: {
      type: MouseEvent,
      required: true
    },
    list: {
      type: Array as PropType<Array<IRightMenuListItem>>,
      default: ''
    },
    onClose: {
      type: Function as PropType<() => void>
    },
    zIndex: { type: Number, default: 1 }
  },
  emits: ['destroy'],
  setup(props, { emit }) {
    //  ref
    let contextMenu: Ref<HTMLDivElement | null> = ref(null);

    /**
     * 显示菜单
     */
    function show() {
      setPosition();
    }

    /**
     * 设置菜单位置
     */
    function setPosition() {
      const { clientX: x, clientY: y } = props.event;
      let menu = contextMenu.value as HTMLDivElement;

      menu.style.left = '-9999px';
      menu.style.top = '-9999px';

      nextTick(() => {
        //  菜单宽度
        let menuWidth = menu.offsetWidth;
        //  菜单高度
        let menuHeight = menu.offsetHeight;
        //  页面宽度
        let clientWidth = document.documentElement.clientWidth;
        //  页面高度
        let clientHeight = document.documentElement.clientHeight;

        //  初始值
        let _x = x;
        let _y = y;

        //  菜单超出底部
        if (y + menuHeight > clientHeight) {
          _y = y - menuHeight;
        }

        //  菜单超出右侧
        if (x + menuWidth > clientWidth) {
          _x = x - menuWidth / 2;
        }
        menu.style.left = `${_x}px`;
        menu.style.top = `${_y}px`;
      });
    }

    /**
     * 菜单项点击
     * @param { IRightMenuListItem } menuItem
     */
    function menuClick(menuItem: IRightMenuListItem) {
      menuItem.handler();
      close();
    }

    /**
     * 菜单关闭
     */
    function close() {
      emit('destroy');
    }

    onMounted(() => {
      show();
    });

    return {
      contextMenu,
      show,
      menuClick,
      close
    };
  }
});
</script>

<style lang="less" scoped>
.context-menu {
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0px 0px 10px #8ba09b;
  position: fixed;
  border-radius: 4px;
  left: 50px;
  top: 120px;
  display: block;
}

.menu-item {
  text-align: left;
  font-size: 13px;
  color: #000;
  height: 36px;
  line-height: 36px;
  transition: 0.3s;
  padding: 0 20px;
  display: flex;
  white-space: nowrap;

  &:hover {
    background-color: #f4f8f7;
    cursor: pointer;
  }

  * {
    cursor: pointer;
  }

  img {
    width: 20px;
    height: 20px;
    margin-top: 7px;
    margin-right: 10px;
  }

  span {
    font-size: 13px;
  }
}
</style>
