import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { Todo } from "../../models/models"

import TodoView from "../../views/todo/todo"

export interface StateProps {
    todos: Todo[]
    enabled: boolean
}
export interface ActionProps {
    addTodo(id: number, text: string)
    removeTodo(id: number)
    close()
    open()
    requestTodo()
    sendText(text: string)
}

function getText(id: string) {
    return (document.getElementById('input') as HTMLInputElement).value
}

var n = 2

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            todos, enabled,
            addTodo, removeTodo,
            close, open,
            requestTodo, sendText
        } = this.props;
        
        var todoItems = todos.length ? todos.map(item => {
            return <TodoView key={item.id} id={item.id} text={item.text} removeTodo={ () => { removeTodo(item.id) } }></TodoView>;
        }) : [];
        return (
            <div>
                <MediaQuery query="(min-width: 400px)">
                    <Link to="/stuff">Goto stuff</Link>
                    <ul>
                        { todoItems }
                    </ul>
                    <input type="text" id="input"></input>
                    Add todo <button onClick= { () => { addTodo(n++, getText('input')) } }>Add todo</button>
                    <button onClick={ close }>Close</button><button onClick={ open }>Open</button>
                    Is open? : { enabled.toString() } <br/>
                    <button onClick= { requestTodo }>Add a todo from the server</button><br/>
                    <button onClick= { () => sendText('hello') }>Send message through socket</button>
                </MediaQuery>
            </div>
        );
    }
}
