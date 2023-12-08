import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { appActions } from "app/app.reducer";
import { authAPI, LoginParamsType } from "features/auth/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { handleServerAppError, handleServerNetworkError } from "common/utils";

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
  extraReducers:(builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    })
  }
});

// thunks
const login = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(`${slice.name}/login`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const response = await authAPI.login(arg);
    if (response.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: true };
    } else {
      handleServerAppError(response.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const logout = createAsyncThunk
<{ isLoggedIn: boolean }, undefined> //undefined так как в санку не приходят аргументы
(`${slice.name}/logout`, async(arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const response = await authAPI.logout()
    if(response.data.resultCode === 0) {
      dispatch(clearTasksAndTodolists());
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
     return{ isLoggedIn: false};
    } else {
      handleServerAppError(response.data, dispatch);
      return rejectWithValue(null);
    }
  }
  catch(error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
})

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
  logout
};
