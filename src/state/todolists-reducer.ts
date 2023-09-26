import { v1 } from 'uuid';
import { TodolistType, todolistsAPI } from '../api/todolists-api'
import { Dispatch } from 'redux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     title: string
//     todolistId: string
// }

export type AddTodolistACType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>


type ActionsType = RemoveTodolistActionType | AddTodolistACType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodolistsACType

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

            return [{...action.payload.todolist, filter:'all'},...state]
            // return [{
            //     id: action.todolistId,
            //     title: action.title,
            //     filter: 'all',
            //     addedDate: '',
            //     order: 0
            // }, ...state]
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
            return action.payload.todolists.map(el => {
                return (
                    {...el, filter: 'all'}
                )
            })
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
// // export const addTodolistAC = (title: string): AddTodolistActionType => {
// //     return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
// // }


export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
        }
    } as const
}



export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}



export const setTodolistsAC  = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}


//Create  THUNK (fetch todolist)

export const fetchTodolistsThunkTC = ()=> {
    
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
        .then((response)=> {
            dispatch(setTodolistsAC(response.data))
        })
}
    
}

//Create THUNK (delete todolist)
export const removeTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(id)
        .then((response)=> {
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
    return (dispatch: Dispatch)=> {
        todolistsAPI.updateTodolist(todolistId,title)
        .then((response)=> {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
    }
}