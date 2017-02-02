import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"


export interface StateProps {
    panicAlert: boolean
    slowerAlert: boolean
    quickerAlert: boolean
}

export interface ActionProps { }

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            panicAlert, slowerAlert, quickerAlert        
        } = this.props;

        return (
                <div className="panel">
                    <div className="panel-heading">
                        Retours des élèves
                    </div>
                    <div className="panel-body">
                        <div className="pal">
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <div className="row">
                                        { panicAlert ? (<div className="indic-light warn-triggered center-block"></div>) : (<div className="indic-light center-block"></div>)}
                                    </div>
                                    <div className="row">
                                        Incompréhénsion
                                    </div>
                                </div>
                                <div className="col-md-4 text-center">
                                    <div className="row">    
                                        { slowerAlert ? (<div className="indic-light warn-triggered center-block"></div>) : (<div className="indic-light center-block"></div>)}
                                    </div>
                                    <div className="row">
                                        Rythme lent
                                    </div>
                                </div>
                                <div className="col-md-4 text-center">
                                    <div className="row">
                                        { quickerAlert ? (<div className="indic-light warn-triggered center-block"></div>) : (<div className="indic-light center-block"></div>)}
                                    </div>
                                    <div className="row">
                                        Rythme rapide
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
