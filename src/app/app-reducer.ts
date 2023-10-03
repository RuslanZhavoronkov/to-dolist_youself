import { Dispatch } from "redux"
import { AppActionType } from "./store"



const initialState = {
    status: 'idle' as RequestStatusType,
    error: null
}


export const appReducer = (state: InitialAppStateType = initialState, action: APPActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':{
            return {...state, error: action.payload.error}
        }    
        default:
            return state
    }
}


//ActionCreate
export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}

export const setErrorAC = (error: string| null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
}
export type setStatusACType = ReturnType <typeof setStatusAC>
export type setErrorACType = ReturnType<typeof setErrorAC>
export type APPActionsType = setStatusACType | setErrorACType