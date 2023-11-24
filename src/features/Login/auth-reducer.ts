import { Dispatch } from "redux"
import { SetAppErrorActionType, SetAppStatusActionType, setAppStatusAC } from "app/app-reducer"
import { LoginParamsType, authAPI } from "api/todolists-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"

// const initialState: InitialStateType = {
//   isLoggedIn: false,
// }

const slice = createSlice({
name: "auth",
initialState:{
  isLoggedIn: false
},
reducers:{
  //под редьюсер
  setIsLoggedIn: (state, action: PayloadAction<{IsLoggedIn: boolean}>) => {
//return измененный state
//return { ...state, isLoggedIn: action.value }
state.isLoggedIn = action.payload.IsLoggedIn
  }  
}
})

// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "login/SET-IS-LOGGED-IN":
//       return { ...state, isLoggedIn: action.value }
//     default:
//       return state
//   }
// }

// actions

// export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET-IS-LOGGED-IN", value }) as const

// thunks
export const loginTC =
//  (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
  (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          //dispatch(setIsLoggedInAC(true))
          dispatch(authActions.setIsLoggedIn({IsLoggedIn:true}))
          dispatch(setAppStatusAC("succeeded"))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
//export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
  export const logoutTC = ():AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        //dispatch(setIsLoggedInAC(false))
        dispatch(authActions.setIsLoggedIn({IsLoggedIn:false}))
        dispatch(setAppStatusAC("succeeded"))
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
// //   isLoggedIn: boolean
// // }

// type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>


export const authReducer = slice.reducer
export const authActions = slice.actions
//export const {setIsLoggedIn} = slice.actions