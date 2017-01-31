import { viewTestFactory } from '../../utils'

import TodoView, { Props } from '../../views/todo/todo'

viewTestFactory<Props>(TodoView, {
    removeTodo() {
        console.log("remove")
    },
    id: 0,
    text: "Ceci est un petit test"
})