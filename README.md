# vue3-context-menu
vue3 context-menu

##  example

```html
<div @contextmenu.prevent="contextMenu($event, yourData)">
</div>
```

```js
import ContextMenu from 'contextMenu';

export default {
    methods: {
        contextMenu(event, yourData) {
            ContextMenu({
                event,
                list: [
                {
                    text: "open",
                    handler() {
                        console.info("open", yourData);
                    },
                },
                {
                    text: "delete",
                    handler() {
                        console.info("delete", yourData);
                    },
                },
                ],
            });
        }
    }
}
```