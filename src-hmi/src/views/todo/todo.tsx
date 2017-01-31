import * as React from "react";

export interface Props {
    removeTodo(): void
    id: number
    text: string
}

export default class TodoView extends React.Component<Props, any> {

    props: Props

    render() {
        const {
            removeTodo,
            id,
            text
         } = this.props;

        return (
            <li> { text } : { id } <button onClick={ removeTodo } >Delete</button> </li>
        );
    }
}
