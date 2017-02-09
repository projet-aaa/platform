import { Thread } from "../../../models/faq"

export const ActionTypes = {
    CREATETHREAD: "FAQ/CREATETHREAD",   
    POSTTHREADMESSAGE: "FAQ/POSTTHREADMESSAGE",
    RETRIEVETHREADINFOS: "FAQ/RETRIEVETHREADINFOS",
    RECEIVETHREADINFOS: "FAQ/RECEIVETHREADINFOS",
    PUBLISHQUESTION: "FAQ/PUBLISHQUESTION",
    CHANGEQUESTIONVALUE: "FAQ/CHANGEQUESTIONVALUE"

}


export interface CreateThreadAction {
        text: string    
        author: string      //Maybe better done server side
        sessionId: number      
}


export interface PostThreadMessageAction {
        text: string        //as html
        threadId: number  
        user: string          
}


export interface RetrieveThreadInfosAction {
        sessionId: number
}   


export interface ReceiveThreadInfosAction {
        sessionId: number
        retrievedInfos: Thread[]
}


export interface PublishQuestionAction {
        sessionId: number
        questionContent: string
}


export interface ChangeQuestionValueAction {
        sessionId: number
        questionValue: string
}