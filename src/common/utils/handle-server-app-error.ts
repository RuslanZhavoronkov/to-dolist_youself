import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

/**
 * Функция для обработки ошибок в приложении
 * @param data 
 * @param {Dispatch} dispatch 
 * @param showGlobalError 
 * @returns {void} -  rrrrrrr
 */


export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showGlobalError = true) => {
  // if (showGlobalError) {
  //   if (data.messages.length) {
  //   dispatch(appActions.setAppError({ error: data.messages[0] }));
  // } else {
  //   dispatch(appActions.setAppError({ error: "Some error occurred" }));
  // }
  // } 
  if (showGlobalError) {
dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  }
  
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
 
