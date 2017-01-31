import * as React from "react";
import { Link } from "react-router"

export default class Stuff extends React.Component<any, any> {

    render() {
        return (<div>
            <Link to="/"> Go back home </Link>
            <div> Hello world! </div>
        </div>)
    }
}