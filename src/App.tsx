
import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from './components/Input';

type TodosType = {
    userId: number
    id: number
    title: string
    completed: boolean
}


const addTodo =() => {
  
  
  const newTodo

}



function App() {
    const [todos, setTodos] = useState<TodosType[]>([])


    const newTitle=use


    const fetchFoo=()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setTodos(json))
    }

    useEffect(() => {
        fetchFoo()
    }, [])

    const onClickHandler=()=>{
        fetchFoo()
    }

    const onClickDeleteHandler=()=>{
        setTodos([])
    }


    return (
        <div className="App">
            <button onClick={onClickHandler}>Show todos</button>
            <button onClick={onClickDeleteHandler}>Delete todos</button>
<div><Input/></div>

            <ul>
                {todos.map(el => {
                    return (
                        <ol>
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
