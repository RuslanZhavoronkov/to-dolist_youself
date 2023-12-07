import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import {
  addTodolistTC,
  changeTodolistTitleTC,
  FilterValuesType,
  removeTodolistTC,
  todolistsActions,
  todolistThunks,
} from "features/TodolistsList/todolists.reducer"
import { taskThunks } from "features/TodolistsList/tasks.reducer"
import { Grid, Paper } from "@mui/material"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "features/auth/auth.selectors"
import { selectTasks } from "features/TodolistsList/tasks.selectors"
import { selectTodolists } from "features/TodolistsList/todolists.selectors"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { AddItemForm } from "common/components"
import { Todolist } from "./Todolist/Todolist"
import { TaskStatuses } from "common/enum/enum"

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    //const thunk = fetchTodolistsTC()
    const thunk = todolistThunks.fetchTodolists()
    dispatch(thunk)
  }, [])

  const removeTask = useCallback(function (id: string, todolistId: string) {
    //const thunk = removeTaskTC(id, todolistId)
    dispatch(taskThunks.removeTaskTC({taskId:id, todolistId}))
  }, [])

  const addTask = useCallback(function (title: string, todolistId: string) {
    const thunk = taskThunks.addTask({ todolistId, title })
    dispatch(thunk)
  }, [])

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    const thunk = taskThunks.updateTask({ taskId: id, domainModel: { status }, todolistId })
    dispatch(thunk)
  }, [])

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    const thunk = taskThunks.updateTask({ taskId: id, domainModel: { title: newTitle }, todolistId })
    dispatch(thunk)
  }, [])

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    dispatch(todolistsActions.changeTodolistFilter({ id, filter }))
  }, [])

  const removeTodolist = useCallback(function (id: string) {
    const thunk = removeTodolistTC(id)
    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const thunk = changeTodolistTitleTC(id, title)
    dispatch(thunk)
  }, [])

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title)
      dispatch(thunk)
    },
    [dispatch]
  )

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
