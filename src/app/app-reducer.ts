import { Dispatch } from "redux"
import { authAPI } from "../api/todolists-api"
import { AppRootStateActionType } from "./store"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { isLoginInChangeAC } from "../features/Login/login-reducer"

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case "APP/SET-IS-INITIALIZED": {
        
            return { ...state, isInitialized: action.payload.isInitialized }
        }
        default:
            return { ...state }
    }
}


//action-create
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        payload: {
            isInitialized
        }
    } as const
}

//thunk
export const setAppInitializedTC = () => (dispatch: Dispatch<AppRootStateActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(isLoginInChangeAC(true))
            } else {
              handleServerAppError(response.data, dispatch);
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}



//type
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedActionType = ReturnType<typeof setAppInitializedAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetInitializedActionType


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    //если true тогда приложение проинициализировано
    isInitialized: boolean
}


