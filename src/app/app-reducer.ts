import { AppThunk } from "./store"
import { authAPI } from "api/todolists-api"
import { authActions } from "features/Login/auth-reducer"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    //подредюсеры
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
      state.isInitialized = action.payload.isAppInitialized
    },
  },
})

export const appReducer = slice.reducer //reduser
export const appActions = slice.actions //object with actionCreate

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export const initializeAppTC = (): AppThunk => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }

    dispatch(appActions.setAppInitialized({ isAppInitialized: true }))
  })
}

const initialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
}

export type InitialStateType = ReturnType <typeof slice.getInitialState>

// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

// type ActionsType = SetAppErrorActionType | SetAppStatusActionType | ReturnType<typeof setAppInitializedAC>

// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//   switch (action.type) {
//     case "APP/SET-STATUS":
//       return { ...state, status: action.status }
//     case "APP/SET-ERROR":
//       return { ...state, error: action.error }
//     case "APP/SET-IS-INITIALIED":
//       return { ...state, isInitialized: action.value }
//     default:
//       return { ...state }
//   }
// }


// export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const
// export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status }) as const
// export const setAppInitializedAC = (value: boolean) => ({ type: "APP/SET-IS-INITIALIED", value }) as const
