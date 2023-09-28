import { v1 } from 'uuid';
import { TodolistType, todolistsAPI } from '../../api/todolists-api'
import { Dispatch } from 'redux';
import { AppActionsType, AppRootStateType, AppThunkType } from '../../app/store';
import { ThunkAction } from 'redux-thunk';

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':
            debugger
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
export const fetchTodolistsThunkTC = (): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
    try {
        const response = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(response.data))
    } catch (e) {
        console.log('Error')
    }
}
export const removeTodolistTC = (id: string): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
    try {
        const response = todolistsAPI.deleteTodolist(id)
        dispatch(removeTodolistAC(id))
    } catch (e) {
        console.log('Error')
    }




}
export const addTodolistTC = (title: string): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
    try {
        const response = await todolistsAPI.createTodolist(title)
         debugger;
        dispatch(addTodolistAC(response.data.data.item))
    } catch (e) {
        console.log('Error')
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunkType =>
    async (dispatch: Dispatch<AppActionsType>) => {
        try {
            const response = todolistsAPI.updateTodolist(todolistId, title)
            dispatch(changeTodolistTitleAC(todolistId, title))
        } catch (e) {
            console.log('Error')
        }
    }

//type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

export type TodolistActionsType =
    AddTodolistACType
    | SetTodolistsACType
    | RemoveTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
