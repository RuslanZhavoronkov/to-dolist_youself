import { appActions, RequestStatusType } from "app/app.reducer"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { AppThunk } from "app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { todolistsAPI, TodolistType } from "./todolistApi"
import { createAppAsyncThunk, handleServerAppError } from "common/utils"

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
    //   const index = state.findIndex((todo) => todo.id === action.payload.id)
    //   if (index !== -1) state.splice(index, 1)
    //   // return state.filter(tl => tl.id !== action.payload.id)
    // },
    // addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
    //   const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
    //   state.unshift(newTodolist)
    // },
    // changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
    //   const todo = state.find((todo) => todo.id === action.payload.id)
    //   if (todo) {
    //     todo.title = action.payload.title
    //   }
    // },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.entityStatus = action.payload.entityStatus
      }
    },
    // setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
    //   return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    //   // return action.payload.forEach(t => ({...t, filter: 'active', entityStatus: 'idle'}))
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id)
        if (todo) {
          todo.title = action.payload.title
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" }
       state.unshift(newTodolist)
      })
  },
})

// thunks

// export const _fetchTodolistsTC = (): AppThunk => {
//   return (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }))
//     todolistsAPI
//       .getTodolists()
//       .then((res) => {
//         dispatch(todolistsActions.setTodolists({ todolists: res.data }))
//         dispatch(appActions.setAppStatus({ status: "succeeded" }))
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch)
//       })
//   }
// }

// export const _removeTodolistTC = (id: string): AppThunk => {
//   return (dispatch) => {
//     //изменим глобальный статус приложения, чтобы вверху полоса побежала
//     dispatch(appActions.setAppStatus({ status: "loading" }))
//     //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
//     dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }))
//     todolistsAPI.deleteTodolist(id).then((res) => {
//       dispatch(todolistsActions.removeTodolist({ id }))
//       //скажем глобально приложению, что асинхронная операция завершена
//       dispatch(appActions.setAppStatus({ status: "succeeded" }))
//     })
//   }
// }

// export const _addTodolistTC = (title: string): AppThunk => {
//   return (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }))
//     todolistsAPI.createTodolist(title).then((res) => {
//       dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
//       dispatch(appActions.setAppStatus({ status: "succeeded" }))
//     })
//   }
// }

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(
  `${slice.name}/fetchTodolistsTC`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const response = await todolistsAPI.getTodolists()
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolists: response.data }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

const removeTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
  `${slice.name}/removeTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      //изменим глобальный статус приложения, чтобы вверху полоса побежала
      dispatch(appActions.setAppStatus({ status: "loading" }))
      //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо { id: string; entityStatus: RequestStatusType }
      dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: "loading" }))
      const response = await todolistsAPI.deleteTodolist(arg.id)
      if (response.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { id: arg.id }
      } else {
        handleServerAppError(response.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${slice.name}/addTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const response = await todolistsAPI.createTodolist(arg)
      if (response.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { todolist: response.data.data.item }
      } else {
        handleServerAppError(response.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

const changeTodolistTitle = createAppAsyncThunk<{ id: string; title: string }, { id: string; title: string }>(
  `${slice.name}/changeTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }))
      const response = await todolistsAPI.updateTodolist(arg.id, arg.title)
      if (response.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { id: arg.id, title: arg.title }
      } else {
        handleServerAppError(response.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

// export const _changeTodolistTitleTC = (id: string, title: string): AppThunk => {
//   return (dispatch) => {
//     todolistsAPI.updateTodolist(id, title).then((res) => {
//       dispatch(todolistsActions.changeTodolistTitle({ id, title }))
//     })
//   }
// }

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

//Object thunk
export const todolistThunks = {
  fetchTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
}

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
