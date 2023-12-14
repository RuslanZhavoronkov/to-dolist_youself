import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "../../api/tasks/tasksApi.types";
import { useActions } from "common/hooks";
import { tasksThunks } from "../../model/tasks/tasks.reducer";
import s from "./Task.module.css"

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({ task, todolistId }: Props) => {
  const { removeTask,updateTask } = useActions(tasksThunks);

  const deleteTaskHandler = () => removeTask({ taskId: task.id, todolistId: todolistId });

  const changeStatusHandler =
    (e: ChangeEvent<HTMLInputElement>) => {
      let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
      //changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId);
      updateTask({taskId:task.id, domainModel:{status}, todolistId})  
    }
    
  const changeTitleHandler = useCallback(
    (title: string) => {
      //changeTaskTitle(task.id, newValue, todolistId);
      updateTask({taskId:task.id,domainModel:{title},todolistId})
    },
    [task.id, todolistId],
  );

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={deleteTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
