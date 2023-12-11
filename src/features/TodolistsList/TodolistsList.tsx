import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilterValuesType, todolistsActions, todolistsThunks } from "features/TodolistsList/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions, useAppDispatch } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";
import { TaskStatuses } from "common/enums";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //const dispatch = useAppDispatch();

  const {
    fetchTodolists,
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
    addTask,
    removeTask,
    updateTask,
    fetchTasks,
    changeTodolistFilter,
  } = useActions({ ...todolistsThunks, ...tasksThunks, ...todolistsActions });
  // const { addTask,removeTask,updateTask,fetchTasks } = useActions(tasksThunks);
  // const{changeTodolistFilter} = useActions(todolistsActions)

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    //dispatch(todolistsThunks.fetchTodolists());
    fetchTodolists();
  }, []);

  const removeTaskCb = useCallback(function (taskId: string, todolistId: string) {
    //dispatch(tasksThunks.removeTask({ taskId, todolistId }));
    removeTask({ taskId, todolistId });
  }, []);

  const addTaskCb = useCallback(function (title: string, todolistId: string) {
    //dispatch(tasksThunks.addTask({ title, todolistId }));
    addTask({ title, todolistId });
  }, []);

  const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
    //dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }));
    updateTask({ taskId, domainModel: { status }, todolistId });
  }, []);

  const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
    // dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }));
    updateTask({ taskId, domainModel: { title }, todolistId });
  }, []);

  const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
    //dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
    changeTodolistFilter({ id, filter });
  }, []);

  const removeTodolistCb = useCallback(function (id: string) {
    //dispatch(todolistsThunks.removeTodolist(id));
    removeTodolist(id);
  }, []);

  const changeTodolistTitleCb = useCallback(function (id: string, title: string) {
    //dispatch(todolistsThunks.changeTodolistTitle({ id, title }));
    changeTodolistTitle({ id, title });
  }, []);

  const addTodolistCb = useCallback((title: string) => {
    //dispatch(todolistsThunks.addTodolist(title));
    addTodolist(title);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCb} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCb}
                  changeFilter={changeFilter}
                  addTask={addTaskCb}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolistCb}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitleCb}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
