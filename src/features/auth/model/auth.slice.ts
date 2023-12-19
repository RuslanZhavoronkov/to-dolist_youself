import { AnyAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { appActions } from "app/app.reducer";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch } from "common/utils";
import { ResultCode } from "common/enums";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
 // return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      // const isShowAppError = !res.data.fieldsErrors.length;
      // handleServerAppError(res.data, dispatch, isShowAppError);
      return rejectWithValue(res.data);
    }
//  });
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("auth/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  // try {
   // return thunkTryCatch(thunkAPI, async()=> {
      const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppInitialized({isInitialized: true}))
      return { isLoggedIn: true };
    } else {
     dispatch(appActions.setAppInitialized({isInitialized: true}))
      return rejectWithValue(null);
    }
    // }).finally(()=> {
    //   dispatch(appActions.setAppInitialized({isInitialized: true}))
    // })
    
  // // } catch (e) {
  // //   handleServerNetworkError(e, dispatch);
  // //   return rejectWithValue(null);
  // // } 
  // } finally {
  //   dispatch(appActions.setAppInitialized({ isInitialized: true }));
  // }
})

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(logout.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(initializeApp.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      .addMatcher(
        // (action: AnyAction) => {
        //   if (
        //     action.type === "app/initializeApp/fulfilled" ||
        //     action.type === "auth/login/fulfilled" ||
        //     action.type === "auth/logout/fulfilled"
        //   ) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // },
        isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
        (state, action) => {
         // debugger
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      )
      
     
  },
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
