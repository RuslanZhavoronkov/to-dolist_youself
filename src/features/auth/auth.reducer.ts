import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { appActions } from "app/app.reducer";
import { authAPI, LoginParamsType } from "features/auth/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils";
import { thunkTryCatch } from "common/utils/thunk-try-catch";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    // setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
    //   state.isLoggedIn = action.payload.isLoggedIn;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const response = await authAPI.login(arg);
      if (response.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        //
        // ❗ Если у нас fieldsErrors есть значит мы будем отображать эти ошибки
        // в конкретном поле в компоненте (пункт 7)
        // ❗ Если у нас fieldsErrors нету значит отобразим ошибку глобально
        const isShowAppError = !response.data.fieldsErrors.length;
        handleServerAppError(response.data, dispatch, isShowAppError);
        return rejectWithValue(response.data);

        //  handleServerAppError(response.data, dispatch, false);
        // //dispatch(appActions.setAppStatus({ status: "failed" }));
        // return rejectWithValue(response.data);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>( //undefined так как в санку не приходят аргументы
  `${slice.name}/logout`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const response = await authAPI.logout();
      if (response.data.resultCode === 0) {
        dispatch(clearTasksAndTodolists());
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: false };
      } else {
        handleServerAppError(response.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

const _initializeApp = createAppAsyncThunk<{ isLoggedIn: true }, undefined>(
  `${slice.name}/initializeApp`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const response = await authAPI.me();
      if (response.data.resultCode === 0) {
        return { isLoggedIn: true };
      } else {
        //handleServerAppError(response.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    }
  },
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: true }, undefined>(
  `${slice.name}/initializeApp`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const response = await authAPI.me();
      if (response.data.resultCode === 0) {
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
        return { isLoggedIn: true };
      } else {
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
        return rejectWithValue(null);
      }
    });
  },
);

// export const _logoutTC = (): AppThunk => (dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }));
//   authAPI
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
//         //dispatch(login.fulfilled({ isLoggedIn: false }));
//         dispatch(clearTasksAndTodolists());
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// export const _loginTC =
//   (data: LoginParamsType): AppThunk =>
//   (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }));
//     authAPI
//       .login(data)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//           dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         } else {
//           handleServerAppError(res.data, dispatch);
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch);
//       });
//   };

export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const authThunks = {
  login,
  logout,
  initializeApp,
};
