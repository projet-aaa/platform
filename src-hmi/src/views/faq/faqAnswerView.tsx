// FAQ ANSWER View
// Renders an answer for a FAQ question

//EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"

export interface StateProps {
    text: string
    author: string
    date: Date
    //Number of upvotes for this question
    votes: number
    id: string
}
export interface ActionProps {}

// Function converting Date format to a string
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
            text,
            author,
            date,
            id,
            votes
        } = this.props;
        var dateString = ddmmyyyy(date)
        return (
            <div>
                <div className="well">
                    <div className="pull-right">
                        <div>
                            <button className="btn btn-primary"><b>+</b></button>
                            <button className="btn btn-primary"><b>-</b></button>
                        </div>
                        <span className="small font-bold">Votes </span>
                        <br/>
                        {votes}
                    </div>
                    <h4>
                        <b>Réponse de {author}</b> ajouté le {dateString}
                    </h4>
                    <div dangerouslySetInnerHTML={{__html:text}}>
                        
                    </div>
                </div>
            </div>
        );
    }
}