import { Dispatch } from "redux";
import {
  SetAppErrorActionType,
  setAppIsInitialized,
  SetAppIsInitializedType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "../../app/app-reducer";
import { authAPI } from "../../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { LoginDataType } from "./Login";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      //debugger
      return { ...state, isLoggedIn: action.value };

    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

// thunks

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(response.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  } finally {
    dispatch(setAppIsInitialized(true)); //в любом случае убрать крутилку после после проверки куки
  }
};

export const loginTC =
  (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    //     authAPI.login(data)
    //     .then ((response)=> {
    // if (response.data.resultCode === 0) {
    //     setIsLoggedInAC(true)
    // }
    try {
      const response = await authAPI.login(data);
      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch);
    }
  };

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(response.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  }
};

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType
  | SetAppIsInitializedType;
