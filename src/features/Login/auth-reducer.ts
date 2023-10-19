

import { authAPI, LoginParamsType } from "api/todolists-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { appActions } from "app/app-reducer"




const slice = createSlice({
  name: "auth",   //action.type='auth/isLoggedIn'
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    //подредьюсеры
    setIsLoggedIn: (state, action:PayloadAction<{isLoggedIn: boolean}>) => {
      state.isLoggedIn=action.payload.isLoggedIn 
    }
  },
})

export const authReducer = slice.reducer  //reducer
export const authActions = slice.actions  //ActionCreator


// thunks
export const loginTC =
  (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status:"loading"}))
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(authActions.setIsLoggedIn({isLoggedIn:true}))
          dispatch(appActions.setAppStatus({status:"succeeded"}))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({status:"loading"}))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({isLoggedIn:false}))
        dispatch(appActions.setAppStatus({status:"succeeded"}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

// types

// type ActionsType = ReturnType<typeof setIsLoggedInAC>
// // type InitialStateType = {
//   isLoggedIn: boolean
// }
// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "login/SET-IS-LOGGED-IN":
//       return { ...state, isLoggedIn: action.value }
//     default:
//       return state
//   }
// }

// actions

//export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET-IS-LOGGED-IN", value }) as const
//type ThunkDispatch = Dispatch< SetAppStatusActionType | SetAppErrorActionType>

// const initialState: InitialStateType = {
//   isLoggedIn: false,
// }