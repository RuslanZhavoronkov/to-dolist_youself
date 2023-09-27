import { v1 } from 'uuid';
import { TodolistType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux';

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':
            return [{ ...action.todolist, filter: 'all' }, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id ? { ...el, title: action.title } : el)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? { ...el, filter: action.filter } : el)

        case 'SET-TODOLISTS':
            return state = action.todolists.map(el => ({ ...el, filter: 'all' }))

        default:
            return state;
    }
}

//actions creat
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: 'SET-TODOLISTS', todolists } as const)
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id: id, title: title } as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter } as const)

//thunks
export const fetchTodolistsThunkTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTodolists()
        .then((response) => {
            dispatch(setTodolistsAC(response.data))
        })
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(id)
        .then((response) => {
            dispatch(removeTodolistAC(id))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then((response) => {
            dispatch(addTodolistAC(response.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then((response) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

//type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    AddTodolistACType
    | SetTodolistsACType
    | RemoveTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
