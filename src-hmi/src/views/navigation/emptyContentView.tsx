// Represents a page with its bands and its menu but without content

// EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"

// INTERNAL IMPORTS
import {View as TopBandView} from "../../views/navigation/topBandView"
import {View as PathBandView} from "../../views/navigation/pathBandView"
import {View as LeftMenuView} from "../../views/navigation/leftMenuView"

export interface StateProps {
    // the name of the app
    appName: string
    // the user full name
    userFullName: string
    // the path from home page
    path: string[]
    // the disciplines list
    disciplines: string[]
    // the actual discipline
    discipline: string
}

export interface ActionProps {}

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            appName,
            userFullName,
            path,
            disciplines,
            discipline
        } = this.props;

        // show the top band, the left menu and the path band
        // the content must be put into the div "page-wrapper" after the path band
        return (
            <div>
                <TopBandView appName={ appName } userFullName={ userFullName }/>
                <div id="wrapper">
                    <LeftMenuView disciplines={ disciplines } discipline={ discipline }/>
                    <div id="page-wrapper">
                        <PathBandView path={ path }/>
                    </div>
                </div>
            </div>
        );
    }
}