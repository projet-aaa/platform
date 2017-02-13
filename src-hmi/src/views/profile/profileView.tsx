// EXTERNAL IMPORTS
import * as React from "react";
import { Link } from "react-router"
import * as MediaQuery from "react-responsive"

// INTERNAL IMPORTS
import StudentProfilContainer from '../../containers/profile/studentProfileContainer'
import TeacherProfilContainer from '../../containers/profile/teacherProfileContainer'

export interface StateProps {
    isTeacher: boolean
}

export interface ActionProps {
    
}

type Props = StateProps & ActionProps;
export class View extends React.Component<Props, any> {
    props: Props

    render() {
        const {
            isTeacher
        } = this.props;

        let content = isTeacher ? <TeacherProfilContainer/> : <StudentProfilContainer/>
         
        return (
            <div>
                { content }
            </div>
        )
    }
}