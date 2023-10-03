import { setErrorAC, setStatusAC } from "../app/app-reducer"
import {ResponseType} from "../api/todolists-api"
import { Dispatch } from "redux"
import { AppActionType } from "../app/store"

export const  handleServerAppError = <D>(data: ResponseType<D>, dispatch:Dispatch<AppActionType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('some error ocurred'))
    }
    dispatch(setStatusAC('failed'))
}


export const handleServerNetwork = (dispatch:Dispatch<AppActionType>, error: {message: string}) => {
    dispatch(setErrorAC(error.message ? error.message : 'some error occured'))
    dispatch(setStatusAC('failed'))
}
