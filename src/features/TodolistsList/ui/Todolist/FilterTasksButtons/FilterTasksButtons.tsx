import Button from "@mui/material/Button/Button";
import { useActions } from "common/hooks";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/todolists/todolists.reducer";
import React from "react";

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {

  const { changeTodolistFilter } = useActions(todolistsActions);
  const {id,filter} = todolist
  
  const filterTasksHandler = (filter:FilterValuesType) => {
    changeTodolistFilter({filter,id})
  }

//   const onAllClickHandler = () => changeTodolistFilter({ filter: "all", id: todolist.id });
//   const onActiveClickHandler = () => changeTodolistFilter({ filter: "active", id: todolist.id });
//   const onCompletedClickHandler = () => changeTodolistFilter({ filter: "completed", id: todolist.id });


  // const onAllClickHandler = useCallback(
  //     () => changeFilter("all", todolist.id),
  //     [todolist.id, changeFilter],
  //   );

  //   const onActiveClickHandler = useCallback(
  //     () => changeFilter("active", todolist.id),
  //     [todolist.id, changeFilter],
  //   );

  //   const onCompletedClickHandler = useCallback(
  //     () => changeFilter("completed", todolist.id),
  //     [todolist.id, changeFilter],
  //   );

  return (
    <>
      <Button variant={filter === "all" ? "outlined" : "text"} onClick={()=>filterTasksHandler("all")} color={"inherit"}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={()=>filterTasksHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={()=>filterTasksHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
