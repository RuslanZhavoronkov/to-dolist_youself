import { v1 } from 'uuid';
import { TodolistType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux';

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

type ActionsType =
AddTodolistACType
|SetTodolistsACType
|RemoveTodolistActionType
|ReturnType<typeof  changeTodolistTitleAC>   
|ReturnType<typeof  changeTodolistFilterAC>



const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {

            return [{ ...action.todolist, filter: 'all' }, ...state]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }

        case 'SET-TODOLISTS': {
            return action.todolists.map(el => {
                return (
                    { ...el, filter: 'all' }
                )
            })
        }

        default:
            return state;
    }
}



export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: 'SET-TODOLISTS', todolists } as const)
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id: id, title: title } as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter } as const)






//Create  THUNK (fetch todolist)

export const fetchTodolistsThunkTC = () => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((response) => {
                dispatch(setTodolistsAC(response.data))
            })
    }

}

//Create THUNK (delete todolist)
export const removeTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(id)
            .then((response) => {
                dispatch(removeTodolistAC(id))
            })
    }
}



//Create THUNK - ADD todolist
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((response) => {
                dispatch(addTodolistAC(response.data.data.item))
            })
    }
}


//Create THUNK - Change todolistTitle
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then((response) => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}