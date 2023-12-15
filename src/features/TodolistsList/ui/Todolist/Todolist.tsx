import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Task } from "../Task/Task";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolists.reducer";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { tasksThunks } from "../../model/tasks/tasks.reducer";
import { TaskType } from "../../api/tasks/tasksApi.types";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  // changeFilter: (value: FilterValuesType, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Todolist = React.memo(function ({
  todolist,
  tasks,
  removeTodolist,
  changeTodolistTitle,
}: Props) {

  const { fetchTasks, addTask } = useActions(tasksThunks);
  
  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCb = useCallback(
    (title: string) => {
      //addTask({title,todolistId:props.todolist.id})
      addTask({ title, todolistId: todolist.id });
    },
    [todolist.id],
  );

  const removeTodolistHandler = () => {
    //props.removeTodolist(props.todolist.id);
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      //props.changeTodolistTitle(props.todolist.id, title);
      changeTodolistTitle(todolist.id, title);
    },
    [todolist.id, changeTodolistTitle],
  );

  
  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === "loading"} />

      {/* Tasks */}
      <Tasks tasks = {tasks} todolist = {todolist}/>
      {/* <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={todolist.id} />
        ))}
      </div> */}

      {/* Buttons */}
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
