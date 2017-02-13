// EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

export interface StateProps {
    
}

export interface ActionProps {
    
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            
        } = this.props;

        return (
            <div>
                [views/profile/studentProfileView] TODO
            </div>
        )
    }
}