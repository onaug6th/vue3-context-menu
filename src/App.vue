<template>
  <img alt="Vue logo" src="./assets/logo.png" @contextmenu.prevent="contextMenu($event)" />
  <HelloWorld
    msg="右键图标打开菜单"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  methods: {
    /**
     * 右键菜单
     * @param event
     */
    contextMenu(event: MouseEvent) {
      const that : any = this;
      that.$contextMenu({
        event,
        list: [
          {
            text: "打开便笺",
            handler() {
              alert("打开便笺");
            },
          },
          {
            text: "删除便笺",
            handler() {
              alert("删除便笺");
            },
          },
        ],
      });
    },
  },
});
</script>

<style>
@import "../dist/style.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
