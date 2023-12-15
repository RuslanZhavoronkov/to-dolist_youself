import React, { useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists.reducer";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { tasksThunks } from "../../model/tasks/tasks.reducer";
import { TaskType } from "../../api/tasks/tasksApi.types";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function ({
  todolist,
  tasks,
  // removeTodolist,
  // changeTodolistTitle,
}: Props) {

  const { fetchTasks, addTask } = useActions(tasksThunks);
  
  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCb = useCallback(
    (title: string) => {
      //addTask({title,todolistId:props.todolist.id})
      return addTask({ title, todolistId: todolist.id }).unwrap();
    },
    [todolist.id],
  );
 
  return (
    <>

      {/* Title */}
      <TodolistTitle todolist={todolist}/>
      <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"} />
      {/* Tasks */}
      <Tasks tasks = {tasks} todolist = {todolist}/>
      {/* Buttons */}
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </>
  );
});
