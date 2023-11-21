const initialState: InitialStateType = {
  isIninitialized: false,
  status: "idle",
  error: null,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-IS-INITIALIZED": {
      return { ...state, isIninitialized: action.payload.isIninitialized };
    }
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  //проинициализированно приложение или нет
  isIninitialized: boolean;
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType;
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null;
};

export const setAppErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error } as const);
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);
export const setAppIsInitialized = (isIninitialized: boolean) => {
  return {
    type: "APP/SET-IS-INITIALIZED",
    payload: {
      isIninitialized,
    },
  } as const;
};

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppIsInitializedType = ReturnType<typeof setAppIsInitialized>;

type ActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetAppIsInitializedType;
