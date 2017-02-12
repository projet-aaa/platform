// Represents a page with a top band and a content

// EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"

// INTERNAL IMPORTS
import {View as TopBandView} from "../../views/navigation/topBandView"

export interface StateProps {
    // the name of the app
    appName: string
    // the user full name
    userFullName: string

}

export interface ActionProps {}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            appName,
            userFullName
        } = this.props;

        // show the top band, the left menu and the path band
        // the content must be put into the div "page-wrapper" after the path band
        return (
            <div>
                <TopBandView appName={ appName } userFullName={ userFullName }/>
                <div className="page-content">

                </div>
            </div>
        );
    }
}