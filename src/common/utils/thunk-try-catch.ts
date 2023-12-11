import { AppDispatch, AppRootStateType } from "app/store";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>, //logic - логика санки
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  debugger
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    debugger
    let res = await logic();
    debugger
    return res;
  } catch (e) {
    debugger
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
