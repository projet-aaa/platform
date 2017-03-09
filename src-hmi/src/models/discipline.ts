import { Session } from './session'

export interface Discipline {
    id: string
    name: string
    sessions: Session[]
}