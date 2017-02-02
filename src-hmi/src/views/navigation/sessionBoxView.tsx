import * as React from "react";
import { Link } from "react-router"

export interface StateProps {
    name: string
    date: Date
}
export interface ActionProps {}

function ddmmyyyy(date: Date): string {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return (dd>9 ? '' : '0') + dd + '/' + 
            (mm>9 ? '' : '0') + mm + '/' +
            date.getFullYear()
};

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            name,
            date
        } = this.props;
        var dateString = ddmmyyyy(date)
        return (
            <div>
                <Link to="/">
                    <div className="panel panel-hover">
                        <div className="panel-body">
                            <div className="pull-right">
                                <h4>{dateString}</h4>
                            </div>
                            <h4>{name}</h4>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}