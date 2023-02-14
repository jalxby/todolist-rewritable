import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";


type TaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}
export type TasksListType = Array<TaskType>


type TodoListType = {
    id: string
    todoListTitle: string
    tasksList: TasksListType
}
type StateType = Array<TodoListType>

export type FilterType = "ALL" | "ACT" | "COM"
const App = () => {

    const [state, setState] = useState<StateType>([{
        id: v1(),
        todoListTitle: "What to learn",
        tasksList: [
            {id: v1(), taskTitle: "JavaScript", isDone: true},
            {id: v1(), taskTitle: "React", isDone: true},
            {id: v1(), taskTitle: "HTML", isDone: false}
        ]
    },
        {
            id: v1(),
            todoListTitle: "What to read",
            tasksList: [
                {id: v1(), taskTitle: "Clean Code", isDone: false},
                {id: v1(), taskTitle: "SOLID", isDone: false},
                {id: v1(), taskTitle: "Algorithms", isDone: true}
            ]
        }
    ])

    const [buttonsTitle, setButtonsTitle] = useState<Array<FilterType>>(["ALL", "ACT", "COM"])

    const [filter, setFilter] = useState<FilterType>("ALL")

    const filtered = [state.map((s => {
        return (
            s.id, s.todoListTitle, s.tasksList.filter(f=>f.isDone===true)
        )
    }))]
    console.log(filtered)

    const toDoList = state.map(s => {
        return (
            <ToDoList
                key={v1()}
                todoListTitle={s.todoListTitle}
                tasksList={s.tasksList}
                buttonsTitle={buttonsTitle}
                setFilter={setFilter}/>
        )
    })

    return (
        <div className="App">
            {toDoList}
        </div>
    );
}

export default App;
