import { todolistsAPI, TodolistType } from "../../api/todolists-api"
import { Dispatch } from "redux"
import { handleServerNetworkError } from "../../utils/error-utils"
import { AppThunk } from "../../app/store"
import { appActions, RequestStatusType } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

//const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      //return state.filter((tl) => tl.id != action.payload.todolistId)
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      // return [{ ...action.payload.todolist, filter: "all", entityStatus: "idle" }, ...state]
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      //return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))

      //1 var
      // const index = state.findIndex(todo => todo.id === action.payload.id)
      // if (index !== -1){
      //   state[index].title = action.payload.title
      // }
      //2 var
      const todolist = state.find((todo) => todo.id === action.payload.id)
      if (todolist) {
        todolist.title = action.payload.title
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      //return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      //return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      // return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      //1 var
     // return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      //2 var
      action.payload.todolists.forEach(tl => {
        state.push({...tl, filter:'all', entityStatus:'idle'})
      })
    },
    clearTodolist: (state, action: PayloadAction) => {
      return state = []
    }
  },
})

// export const todolistsReducer = (
//   state: Array<TodolistDomainType> = initialState,
//   action: ActionsType,
// ): Array<TodolistDomainType> => {
//   switch (action.type) {
//     case "REMOVE-TODOLIST":
//       return state.filter((tl) => tl.id != action.id)
//     case "ADD-TODOLIST":
//       return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state]

//     case "CHANGE-TODOLIST-TITLE":
//       return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl))
//     case "CHANGE-TODOLIST-FILTER":
//       return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
//     case "CHANGE-TODOLIST-ENTITY-STATUS":
//       return state.map((tl) => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
//     case "SET-TODOLISTS":
//       return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
//     default:
//       return state
//   }
// }

// actions
// export const removeTodolistAC = (id: string) => ({ type: "REMOVE-TODOLIST", id }) as const
// export const addTodolistAC = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist }) as const
// export const changeTodolistTitleAC = (id: string, title: string) =>
//   ({
//     type: "CHANGE-TODOLIST-TITLE",
//     id,
//     title,
//   }) as const
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
//   ({
//     type: "CHANGE-TODOLIST-FILTER",
//     id,
//     filter,
//   }) as const
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
//   ({
//     type: "CHANGE-TODOLIST-ENTITY-STATUS",
//     id,
//     status,
//   }) as const
// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: "SET-TODOLISTS", todolists }) as const

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    //dispatch(setAppStatusAC("loading"))
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        //dispatch(setTodolistsAC(res.data))
        dispatch(todolistsActions.setTodolists({ todolists: res.data }))

        // dispatch(setAppStatusAC("succeeded"))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    // dispatch(setAppStatusAC("loading"))
    dispatch(appActions.setAppStatus({ status: "loading" }))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    // dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }))
    todolistsAPI.deleteTodolist(id).then((res) => {
      // dispatch(removeTodolistAC(todolistId))
      dispatch(todolistsActions.removeTodolist({ id }))
      //скажем глобально приложению, что асинхронная операция завершена
      //dispatch(setAppStatusAC("succeeded"))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    // dispatch(setAppStatusAC("loading"))
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.createTodolist(title).then((res) => {
      // dispatch(addTodolistAC(res.data.data.item))
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
      // dispatch(setAppStatusAC("succeeded"))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      // dispatch(changeTodolistTitleAC(id, title))
      dispatch(todolistsActions.changeTodolistTitle({ id, title }))
    })
  }
}

// types
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
// type ActionsType =
//   | RemoveTodolistActionType
//   | AddTodolistActionType
//   | ReturnType<typeof changeTodolistTitleAC>
//   | ReturnType<typeof changeTodolistFilterAC>
//   | SetTodolistsActionType
//   | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
//type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>

//главный редьюсер
export const todolistsReducer = slice.reducer
//object with actionCreator
export const todolistsActions = slice.actions
