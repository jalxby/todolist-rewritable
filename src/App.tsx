import React, {useState} from 'react';
import {v1} from "uuid";
import {ToDoList} from "./ToDoList";
import {useAutoAnimate} from "@formkit/auto-animate/react";

export type FilterType = 'ALL' | 'COM' | 'ACT'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksStateType = {
    [id: string]: Array<TaskType>
}

type StateType = Array<ToDoListType>

type ToDoListType = {
    id: string
    title: string
    filter: FilterType
}

const App = () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const [state, setState] = useState<StateType>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'ALL'},
            {id: todolistID2, title: 'What to read', filter: 'ALL'}
        ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const setFilter = (filter: FilterType, toDoId: string) => {
        const todoList = state.find(s => s.id === toDoId)
        todoList && (todoList.filter = filter)
        setState([...state])
    }

    const removeToDoList = (toDoId: string) => {
        const todoList = state.filter(s => s.id !== toDoId)
        setState([...todoList])
        delete tasks[toDoId]
        setTasks({...tasks})
    }

    const removeTask = (taskId: string, toDoId: string) => {
        let taskList = tasks[toDoId]
        tasks[toDoId] = taskList.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, toDoId: string, isDone: boolean) => {
        const changedTask = tasks[toDoId].find(t => t.id === taskId)
        changedTask && (changedTask.isDone = isDone)
        setTasks({...tasks})
    }

    const addTask = (toDoId: string, taskTitle: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        tasks[toDoId] = [newTask, ...tasks[toDoId]]
        setTasks({...tasks})
        // console.log(tasks[todolistID1])???
        // console.log(tasks[todolistID2])???
    }
    const [listRef] = useAutoAnimate<HTMLDivElement>()
    return (
        <div className={'App'} ref={listRef}>
            {state.map(s => {
                    let tasksList
                    s.filter === 'COM'
                        ? tasksList = tasks[s.id].filter(t => t.isDone)
                        : s.filter === 'ACT'
                            ? tasksList = tasks[s.id].filter(t => !t.isDone)
                            : tasksList = tasks[s.id]
                    return (
                        <ToDoList
                            key={s.id}
                            id={s.id}
                            title={s.title}
                            tasksList={tasksList}
                            setFilter={setFilter}
                            removeToDoList={removeToDoList}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            addTask={addTask}
                            filter={s.filter}
                        />
                    )
                }
            )}
        </div>
    );
};

export default App;