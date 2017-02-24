// Represents the menu with the disciplines on the left of the application

// INTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

import { Discipline } from "../../models/discipline"
import { View as DesktopView } from "./leftMenuViewDesktop"
import { View as MobileView } from "./leftMenuViewMobile"

export interface StateProps {
    // the disciplines list
    disciplines: Discipline[]
    // the actual discipline
    discipline: string
}

export interface ActionProps {  }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        return (
            <div>
                <MediaQuery query='(min-width: 767px)'>
                    <DesktopView {...this.props}/>
                </MediaQuery>
                <MediaQuery query='(max-width: 767px)'>
                    <MobileView {...this.props}/>
                </MediaQuery>
            </div>
        );
    }
}