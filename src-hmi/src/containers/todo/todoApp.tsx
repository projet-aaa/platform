import { connect } from "react-redux";

import { addTodo, removeTodo, close, open, requestTodo } from "../../store/todo/actions/actions";
import { sendText } from "../../server/actions"

import { Todo } from "../../models/models"

import { StateProps, ActionProps, View } from "../../views/todo/todosView"

import { getTodos } from "../../store/todo/selectors"

function mapStateToProps(state: any): StateProps {
    return { todos: getTodos(state), enabled: state.stuff.enabled }
}
function mapDispatchToProps(dispatch): ActionProps {
    return {
        addTodo: (id: number, text: string) => dispatch(addTodo(id, text)),
        removeTodo: (id: number) => dispatch(removeTodo(id)),
        close: () => dispatch(close()),
        open: () => dispatch(open()),
        requestTodo: () => dispatch(requestTodo()),
        sendText: (text: string) => dispatch(sendText(text))
    }
}

export default connect<StateProps, ActionProps, any>(
    mapStateToProps, 
    mapDispatchToProps
)(View)