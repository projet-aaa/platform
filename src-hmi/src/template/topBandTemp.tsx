// Represents a page with a top band and a content

// EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"

// INTERNAL IMPORTS
import TopBandContainer from "../containers/navigation/topBandContainer"

export interface IntrinsicProps {
    children: any
}

export type Props = IntrinsicProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            children
        } = this.props;

        // show the top band, the left menu and the path band
        // the content must be put into the div "page-wrapper" after the path band
        return (
            <div>
                <TopBandContainer/>
                <div className="page-content">
                    { children }
                </div>
            </div>
        );
    }
}