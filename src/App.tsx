import React, {useState} from 'react';
import {v1} from "uuid";
import {ToDoList} from "./ToDoList";
import './App.css'
import {UniversalInput} from "./UniversalInput";

export type TodoListsType = {
    id: string
    title: string
}
type TasksStateType = {
    [key: string]: {
        data: Array<DataType>
        filter: FilterType
    }

}
export type DataType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'ALL' | 'ACT' | 'COM'

export const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        // {id: todolistId1, title: "What to learn"},
        // {id: todolistId2, title: "What to buy"}

    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        // [todolistId1]: {
        //     data: [
        //         {id: v1(), title: "HTML&CSS1111", isDone: false},
        //         {id: v1(), title: "JS1111", isDone: true}
        //     ],
        //     filter: "ALL"
        // },
        // [todolistId2]: {
        //     data: [
        //         {id: v1(), title: "HTML&CSS22222", isDone: true},
        //         {id: v1(), title: "JS2222", isDone: false}
        //     ],
        //     filter: "ACT"
        // }
    });
    const removeToDoList = (toDoId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== toDoId))
        delete tasks[toDoId]
    }
    const addNewTask = (toDoId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [toDoId]: {...tasks[toDoId], data: [...tasks[toDoId].data, newTask]}})
    }
    const changeTaskStatus = (toDoId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [toDoId]: {
                ...tasks[toDoId],
                data: tasks[toDoId].data.map(d => d.id === taskId ? {...d, isDone: isDone} : d)
            }
        })
    }
    const applyFilter = (toDoId: string, filter: FilterType) => {
        setTasks({...tasks, [toDoId]: {...tasks[toDoId], filter: filter}})
    }
    const removeTask = (toDoId: string, taskId: string) => {
        setTasks({...tasks, [toDoId]: {...tasks[toDoId], data: tasks[toDoId].data.filter(t => t.id !== taskId)}})
    }

    const addToDoList = (title: string) => {
        const todolistId = v1()
        const newToDoList = {id: todolistId, title: title}
        setTodoLists([...todoLists, newToDoList])
        setTasks({...tasks, [todolistId]: {data: [], filter: 'ALL'}})
    }
    const updateTaskTitle = (toDoId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [toDoId]: {
                ...tasks[toDoId],
                data: tasks[toDoId].data.map(t => t.id === taskId ? {...t, title: newTitle} : t)
            }
        })
    }

    const updateToDoTitle = (toDoId: string, newTitle: string) => {
        setTodoLists(todoLists.map(t => t.id === toDoId ? {...t, title: newTitle} : t))
    }

    return (
        <div className={'App'}>
            <UniversalInput callback={addToDoList}/>
            {todoLists.map(t => {
                let filteredTasks = tasks[t.id].data
                if (tasks[t.id].filter === "ACT") filteredTasks = tasks[t.id].data.filter(t => !t.isDone)
                if (tasks[t.id].filter === "COM") filteredTasks = tasks[t.id].data.filter(t => t.isDone)
                return (

                    <ToDoList
                        key={t.id}
                        toDoId={t.id}
                        title={t.title}
                        tasks={filteredTasks}
                        applyFilter={applyFilter}
                        addNewTask={addNewTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        removeToDoList={removeToDoList}
                        filter={tasks[t.id].filter}
                        updateTaskTitle={updateTaskTitle}
                        updateToDoTitle={updateToDoTitle}
                    />

                )
            })}
        </div>
    )

}