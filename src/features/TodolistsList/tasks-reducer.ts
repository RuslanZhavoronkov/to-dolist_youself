import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from "../../api/todolists-api"
import { Dispatch } from "redux"
import { AppRootStateType, AppThunk } from "../../app/store"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { appActions } from "app/app-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todolistsActions } from "./todolists-reducer"

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "task",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      // return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id != action.payload.taskId) }
      const taskIndex = state[action.payload.todolistId].findIndex((ts) => ts.id === action.payload.taskId)
      if (taskIndex !== -1) {
        state[action.payload.todolistId].splice(taskIndex, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      // return {
      //   ...state,
      //   [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
      // }

      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      // return {
      //   //   ...state,
      //   //   [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
      //   //     t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t,
      //   //   ),
      // }
      const taskIndex = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
      if (taskIndex !== -1) {
        state[action.payload.todolistId][taskIndex] = {...state[action.payload.todolistId][taskIndex], ...action.payload.model}
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
      //return { ...state, [action.payload.todolistId]: action.payload.tasks }
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (bilder) => {
bilder
.addCase(todolistsActions.addTodolist, (state, action)=>{
 // return { ...state, [action.payload.todolist.id]: [] }
 state[action.payload.todolist.id]=[] 
})
.addCase(todolistsActions.removeTodolist, (state, action) => {
  // const copyState = { ...state }
  //     delete copyState[action.id]
  //     return copyState
  delete state[action.payload.id]
})
.addCase(todolistsActions.setTodolists, (state, action) => {
  action.payload.todolists.forEach(todo =>  {
    state[todo.id] = []
  } )
})
.addCase(todolistsActions.clearTodolist, (state, action) => {
  return state = {}
})
  }

  
})

// export const _tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
//   switch (action.type) {
//     case "REMOVE-TASK":
//       return { ...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id != action.taskId) }
//     case "ADD-TASK":
//       return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
//     case "UPDATE-TASK":
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map((t) =>
//           t.id === action.taskId ? { ...t, ...action.model } : t,
//         ),
//       }
//     case "ADD-TODOLIST":
//       return { ...state, [action.todolist.id]: [] }
//     case "REMOVE-TODOLIST":
//       const copyState = { ...state }
//       delete copyState[action.id]
//       return copyState
//     case "SET-TODOLISTS": {
//       const copyState = { ...state }
//       action.todolists.forEach((tl: any) => {
//         copyState[tl.id] = []
//       })
//       return copyState
//     }
//     case "SET-TASKS":
//       return { ...state, [action.todolistId]: action.tasks }
//     default:
//       return state
//   }
// }

// // actions
// export const removeTaskAC = (taskId: string, todolistId: string) =>
//   ({ type: "REMOVE-TASK", taskId, todolistId }) as const
// export const addTaskAC = (task: TaskType) => ({ type: "ADD-TASK", task }) as const
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
//   ({ type: "UPDATE-TASK", model, todolistId, taskId }) as const
// export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
//   ({ type: "SET-TASKS", tasks, todolistId }) as const

// thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    // dispatch(setAppStatusAC("loading"))
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items
     // dispatch(setTasksAC(tasks, todolistId))
      dispatch(tasksActions.setTasks({tasks,todolistId}))
      //dispatch(setAppStatusAC("succeeded"))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
  }
export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
    // const action = removeTaskAC(taskId, todolistId)
    // dispatch(action)
    dispatch(tasksActions.removeTask({taskId,todolistId}))
  })
}
export const addTaskTC =
  (title: string, todolistId: string): AppThunk =>
  (dispatch) => {
    // dispatch(setAppStatusAC("loading"))
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          // const action = addTaskAC(task)
          // dispatch(action)
          dispatch(tasksActions.addTask({task}))
          //dispatch(setAppStatusAC("succeeded"))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn("task not found in the state")
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    }

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          // const action = updateTaskAC(taskId, domainModel, todolistId)
          // dispatch(action)
          dispatch(tasksActions.updateTask({model:domainModel,taskId,todolistId}))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
// type ActionsType =
//   | ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof addTaskAC>
//   | ReturnType<typeof updateTaskAC>
//   | ReturnType<typeof setTasksAC>
//   | any
//type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>

//главный редьюсер
export const tasksReducer = slice.reducer
//object with actionsCreators
export const tasksActions = slice.actions
