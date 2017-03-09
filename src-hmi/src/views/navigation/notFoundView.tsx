import * as React from "react"
import { Link } from "react-router"

import rootWrapper from "../../wrappers/rootWrapper"

interface StateProps { }
interface ActionProps { }

type Props = StateProps & ActionProps;
class View extends React.Component<Props, any> {
    props: Props

    render() {
        return (
            <div className="col-lg-12"> 
                <div className="row">
                    <div className="col-lg-12">
                        <h2 style={ { marginTop: 0 } }>404: La page que vous cherchez n'existe pas</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default rootWrapper(
    null,
    null,
    null,
    null,
    null,
    View
)