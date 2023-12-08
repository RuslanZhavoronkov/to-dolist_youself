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

const initializeApp = createAppAsyncThunk<any, any>(`${slice.name}/initializeApp`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    } else {
      handleServerAppError(response.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
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

export const appThunks = {
  initializeApp,
};
export const appReducer = slice.reducer;
export const appActions = slice.actions;
