import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TaskActionsType, tasksReducer } from '../features/TodolistsList/tasks-reducer';
import { TodolistActionsType, todolistsReducer } from '../features/TodolistsList/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers,  legacy_createStore} from 'redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

//Делаем главный тип Action для проекта
export type AppActionsType = TodolistActionsType | TaskActionsType

//Сделаем универсальный тип thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppDispatchType = ThunkDispatch<AppRootStateType,any,AnyAction>

