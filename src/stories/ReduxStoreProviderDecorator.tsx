import { Provider } from "react-redux"
import {combineReducers, createStore, legacy_createStore} from 'redux'
import { tasksReducer } from "../state/tasks-reducer";
import { todolistsReducer } from "../state/todolists-reducer";
import { v1 } from "uuid";
import { AppRootStateType } from "../state/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
 })
 
 export const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
        ]
    }
 };
 
 export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);
 
 export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)




