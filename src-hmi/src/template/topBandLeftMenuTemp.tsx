// EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import TopBandContainer from "../containers/navigation/topBandContainer"
import LeftMenuContainer from "../containers/navigation/leftMenuContainer"
import { View as PathBandView } from "../views/navigation/pathBandView"
import { View as LeftMenuView } from "../views/navigation/leftMenuView"

export interface IntrinsicProps {
    children: any
}

export type Props = IntrinsicProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            children
        } = this.props

        // show the top band, the left menu and the path band
        // the content must be put into the div "page-wrapper" after the path band
        return (
            <div>
                <MediaQuery query='(min-width: 767px)'>
                    <TopBandContainer/>
                    <div id="wrapper">
                        <LeftMenuContainer discipline={ (this.props as any).params.UE }/>
                        <div id="page-wrapper" style={ {marginTop: 0} }>
                            <PathBandView fullpath={ (this.props as any).location.pathname }/>
                            <div className="page-content">
                                { children }
                            </div>
                            <div id="footer">
                                <div className="copyright">
                                    <a href="#">2017 @ Adam, Jules, Simon, Antoine, Vincent, Gibs </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query='(max-width: 767px)'>
                    <TopBandContainer/>
                    <div id="wrapper">
                        <LeftMenuContainer discipline={ (this.props as any).params.UE }/>
                        <div id="page-wrapper" style={ {marginTop: 0} }>
                            <div className="page-content-wrapper">
                                <button type="button" className="hamburger is-closed" data-toggle="offcanvas">
                                    Menu
                                </button>
                                { children }
                            </div>
                            <div id="footer">
                                <div className="copyright">
                                    <a href="#">2017 @ Adam, Jules, Simon, Antoine, Vincent, Gibs </a></div>
                            </div>
                        </div>
                    </div>
                </MediaQuery>
            </div>
        );
    }
}