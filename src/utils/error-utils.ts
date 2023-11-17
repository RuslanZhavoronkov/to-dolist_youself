import { Dispatch } from "redux"
import { SetErrorType, SetStatusType, setErrorAC, setStatusAC } from "../app/app-reducer"
import { ResponseType } from "../api/todolists-api"


//Утилитная функция, которая ловит клиентские ошибки
export const handleServerAppError = <D>( 
    dispatch: ErrorUtilsDispatchType, 
    data: ResponseType<D>
    ) => {
    if (data.messages) {
        dispatch(setErrorAC(data.messages[0]));
      } else {
        dispatch(setErrorAC("call 911"));
      }
      dispatch(setStatusAC("failed"));
}



//Утилитная функция, которая ловит ошибки сервера
export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error:{message: string}) => {
    dispatch(setErrorAC(error.message)) 
    dispatch(setStatusAC('failed')) //уберем крутилку
}

type ErrorUtilsDispatchType = Dispatch<SetStatusType | SetErrorType>