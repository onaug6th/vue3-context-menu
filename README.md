# vue3-context-menu

vue3 contextMenu

##  example

install plugin.

```ts
//  main.ts

import { createApp } from 'vue';
import App from './App.vue';
import ContextMenu from './components/contextMenu';

createApp(App).use(ContextMenu).mount('#app');
```

use plugin.

```html
<div @contextmenu.prevent="showMenu($event)"></div>
```

```js
export default defineComponent({
  name: 'App',
  methods: {
    showMenu(event: MouseEvent) {
      this.$contextMenu({
        event,
        list: [
          {
            text: "open note",
            handler() {
              console.info("open note");
            },
          },
          {
            text: "delete note",
            handler() {
              console.info("delete note");
            }
          }
        ]
      });
    }
  }
})
```
