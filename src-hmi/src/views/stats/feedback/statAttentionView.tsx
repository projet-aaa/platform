import * as React from "react"
import { Link } from "react-router"
import * as chartjs from "react-chartjs-2"

export interface StateProps {
    panic: number[]
    tooSlow: number[]
    tooFast: number[]
    date: number[]
}

export interface ActionProps { }

const panicColor = "#FF6384"
const tooFastColor = "#36A2EB"
const tooSlowColor = "#ffff00"

export type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    calculateData(panic: number[], tooSlow: number[], tooFast: number[], date: number[]): any {
        return {
            labels: date,
            datasets: [
                {
                    label: "Panique",
                    data: panic,
                    pointBorderColor: panicColor,
                    borderColor: panicColor,
                    fill: false,
                    lineTension: 0.1
                },
                {
                    label: "Trop lent",
                    data: tooSlow,
                    pointBorderColor: tooSlowColor,
                    borderColor: tooSlowColor,
                    fill: false,
                    lineTension: 0.1
                },
                {
                    label: "Trop rapide",
                    data: tooFast,
                    pointBorderColor: tooFastColor,
                    borderColor: tooFastColor,
                    fill: false,
                    lineTension: 0.1
                }
            ]
        }
    }

    render() {
        const {
            panic,
            tooSlow,
            tooFast,
            date
        } = this.props

        let data = this.calculateData(panic, tooSlow, tooFast, date)

        return (
            <div className="panel">
                <div className="panel-heading">
                    L'attention durant le cours:
                </div>
                <div className="panel-body pan white-background"> 
                    <chartjs.Line data={ data }/>  
                </div>
            </div>
        );
    }
}