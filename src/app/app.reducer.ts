import { Dispatch } from "redux";
import { authActions, authThunks } from "features/auth/auth.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "features/auth/auth.api";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // для изменения локального state без санок так и остануться подредьюсеры
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  
});



// export const initializeAppTC = () => (dispatch: Dispatch) => {
//   authAPI.me().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//       //dispatch(authThunks.login.fulfilled({ isLoggedIn: true }));
//     } else {
//     }

//     dispatch(appActions.setAppInitialized({ isInitialized: true }));
//   });
// };


export const appReducer = slice.reducer;
export const appActions = slice.actions;
