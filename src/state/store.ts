import { createStore, legacy_createStore,combineReducers } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";



//создадим главный корневой Reducer
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

//создадим объект store
export const store = legacy_createStore(rootReducer)
//window.store = store


export type AppRootState = ReturnType<typeof rootReducer>