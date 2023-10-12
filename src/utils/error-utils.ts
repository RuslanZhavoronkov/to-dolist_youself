import {ResponseType} from '../api/todolists-api'
import { appSetErrorAC, appSetStatusAC } from '../app/app-reducer'
import { AppRootActionType } from '../app/store'
import { Dispatch } from 'redux'

export const handleServerAppError = <D>(data:ResponseType<D>, dispatch:Dispatch<AppRootActionType>) => {
    if (data.messages.length) {
        dispatch(appSetErrorAC(data.messages[0]))
    } else {
        dispatch(appSetErrorAC('Some error occurred'))
    }
    dispatch(appSetStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch:Dispatch<AppRootActionType>) => {
    dispatch(appSetErrorAC(message ? message : 'Some error occurred'))
    dispatch(appSetStatusAC('failed'))
}