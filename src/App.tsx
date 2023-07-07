import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from "./components/Input";
import {Button} from "./components/Button";

type TodosType = {
    userId: number
    id: number
    title: string
    completed: boolean
}


function App() {
    const [todos, setTodos] = useState<TodosType[]>([])
    //const[newTitle,setNewTitle]=useState('')
    console.log(todos)

    const newTitle = useRef<HTMLInputElement>(null)


    const fetchFoo = () => {
        fetch('https://jsonplaceholder.typicode.com/todos') //
            .then(response => response.json())
            .then(json => setTodos(json))
    }

    useEffect(() => {
        fetchFoo()
    }, [])

    const onClickHandler = () => {
        fetchFoo()
    }

    const onClickDeleteHandler = () => {
        setTodos([])
    }

    const addTodo = () => {
        if (newTitle.current) {
            const newTodo = {userId: 999, id: todos.length + 1, title: newTitle.current.value, completed: false}
            setTodos([newTodo, ...todos])
            newTitle.current.value=''
        }
        // setNewTitle('')


    }


    return (
        <div className="App">
            <Button name={'Show todos'} callBack={onClickHandler}/>
            <Button name={'Delete todos'} callBack={onClickDeleteHandler}/>
            <div>
                {/*<Input newTitle={newTitle} setNewTitle={setNewTitle}/>*/}
                <Input newTitle={newTitle} />
                <Button name={'addTodo'} callBack={addTodo}/>
            </div>

            <ul>
                {todos.map(el => {
                    return (
                        <ol key={el.id}>
                            <span>{el.id} - </span>
                            <span>{el.title}</span>
                            <input type="checkbox" checked={el.completed}/>
                            <span>{el.completed}</span>
                        </ol>
                    )
                })}
            </ul>

        </div>
    );
}

export default App;
