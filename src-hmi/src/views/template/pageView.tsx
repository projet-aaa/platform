import * as React from "react"
import { Link } from "react-router"

import { View as TemplateContentView } from "./templateContentView"
import { View as Template } from "./templateTemp"

export interface StateProps { }
export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const { } = this.props

        return (
            <Template view={ <TemplateContentView/> } />
        );
    }
}