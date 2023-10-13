import { Dispatch } from "redux"
import { AppRootStateActionType } from "../../app/store"
import { LoginParamsType, authAPI } from "../../api/todolists-api"
import { setAppStatusAC } from "../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"


const initialLoginState = {
   isLoginIn: false
}


export const authReducer = (state:LoginStateType = initialLoginState, action: LoginActionType):LoginStateType  => {
    switch(action.type) {
        case 'login/SET-IS-LOGIN-IN' : {
         
            return {...state, isLoginIn: action.payload.isLoginIn}
        }
        default: {
            return state
        }
    }

}



//action-create
export const isLoginInChangeAC = (isLoginIn: boolean) => {
    return {
        type: 'login/SET-IS-LOGIN-IN',
payload: {
    isLoginIn
}
    } as const
}



//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AppRootStateActionType>)=> {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
    .then((response)=> {
        if(response.data.resultCode === 0) {
            dispatch(isLoginInChangeAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(response.data, dispatch);
        }
    })
    .catch((error) => {
        handleServerNetworkError(error, dispatch);
    })
}

export const loginOutTC = ()=> (dispatch: Dispatch<AppRootStateActionType>) => {
    authAPI.logOut()
    .then((response)=> {
        if(response.data.resultCode === 0) {
            dispatch(isLoginInChangeAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(response.data, dispatch);
        }
    })
    .catch((error) => {
        handleServerNetworkError(error, dispatch);
    })
}

//type
export type LoginStateType = {
    isLoginIn: boolean
}

export type isLoginInChangeActionType = ReturnType<typeof isLoginInChangeAC>
export type LoginActionType = isLoginInChangeActionType