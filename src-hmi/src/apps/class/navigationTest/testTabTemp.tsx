import * as React from "react";
import { viewTestFactory } from '../../../utils'

import { View, Props } from '../../../views/template/tabTemp'
import { View as SessionBoxView } from "../../../views/navigation/sessionBoxView"

viewTestFactory<Props>(View, {
    // the tab names
    names: ["tab1", "tab2", "tab3", "tab4", "tab5", "tab6", "tab7", "tab8"],
    // the actual tab name
    actualTabName: "tab3",
    // the tab views
    views:  [
                <SessionBoxView name={ "tab1" } date={ new Date(2017,0,1) }/>,
                <SessionBoxView name={ "tab2" } date={ new Date(2017,0,1) }/>,
                <SessionBoxView name={ "tab3" } date={ new Date(2017,0,1) }/>,
                <SessionBoxView name={ "tab4" } date={ new Date(2017,0,1) }/>,
                <SessionBoxView name={ "tab5" } date={ new Date(2017,0,1) }/>,
                <SessionBoxView name={ "tab6" } date={ new Date(2017,0,1) }/>,
                <SessionBoxView name={ "tab7" } date={ new Date(2017,0,1) }/>,
                <SessionBoxView name={ "tab8" } date={ new Date(2017,0,1) }/>,
            ]
})