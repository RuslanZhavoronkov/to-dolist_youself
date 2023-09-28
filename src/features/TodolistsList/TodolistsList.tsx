import { useCallback, useEffect } from "react"
import { FilterValuesType, TodolistDomainType, addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsThunkTC, removeTodolistTC } from "./todolists-reducer"
import { useSelector } from "react-redux"
import { AppDispatchType, AppRootStateType } from "../../app/store"
import { TasksStateType, addTaskTC, removeTaskTC, updateTaskTC } from "./tasks-reducer"
import { useDispatch } from "react-redux"
import { TaskStatuses } from "../../api/todolists-api"
import Grid from "@mui/material/Grid"
import { AddItemForm } from "../../components/AddItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { useAppDispatch, useAppSelector } from "../../app/hoks"

export const TodolistsList = () =>  {
    useEffect(() => {
        dispatch(fetchTodolistsThunkTC())
    }, [])

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, id))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title))
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(todolistId, id, { status }))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
        dispatch(updateTaskTC(todolistId, id, { title }))
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id))
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title))
    }, []);

    const addTodolist = useCallback((title: string) => {
        debugger
        dispatch(addTodolistTC(title))
    }, [dispatch]);
    return (
        <>
            <Grid container style={{ padding: '20px' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{ padding: '10px' }}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>)
                    })
                }
            </Grid>


        </>
    )
}