import { instance } from "common/api/common.api";
import { TaskPriorities, TaskStatuses } from "common/enums/common.enums";
import { BaseResponseType } from "common/types";
import { UpdateDomainTaskModelType } from "../../model/tasks/tasks.reducer";
import { AddTaskArgType, GetTasksResponse, RemoveTaskArgType, TaskType, UpdateTaskModelType } from "./tasksApi.types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<
      BaseResponseType<{
        item: TaskType;
      }>
    >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
