import React, {ChangeEvent, FC, useState} from 'react';
import './App.css'
import {Button} from "./Button";
import {TasksList} from "./TasksList";
import {FilterType, TaskType} from "./App";

type ToDoListType = {
    id: string
    title: string
    tasksList: Array<TaskType>
    setFilter: (filter: FilterType, toDoId: string) => void
    removeToDoList: (toDoId: string) => void
    removeTask: (taskId: string, toDoId: string) => void
    changeTaskStatus: (taskId: string, toDoId: string, isDone: boolean) => void
    addTask: (toDoId: string, taskTitle: string) => void
    filter: FilterType
}
// callback: () => void

export const ToDoList: FC<ToDoListType> = (props) => {

    const maxTaskTitle = 10
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const addTaskHandler = () => {
        if (inputValue.trim() === '') {
            setError('TaskTitle is required!')
        } else {
            props.addTask(props.id, inputValue.trim())
            setInputValue('')
        }
    }

    const setInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > maxTaskTitle) {
            setError('TaskTitle is too long')
        } else {
            setError('')
        }
        setInputValue(e.currentTarget.value)
    }

    const removeToDoListHandler = () => {
        props.removeToDoList(props.id)
    }

    const setAllFilterHandler = () => props.setFilter('ALL', props.id)
    const setCOMFilterHandler = () => props.setFilter('COM', props.id)
    const setACTFilterHandler = () => props.setFilter('ACT', props.id)

    return (
        <fieldset className={'fieldset'}>
            <legend>
                <span>What to learn</span>
                <button
                    onClick={removeToDoListHandler}
                >x
                </button>
            </legend>
            <input
                className={`${'input'} ${error && 'error'}`}
                type={"text"}
                value={inputValue}
                onChange={setInputHandler}
            />
            <button
                disabled={inputValue.length > maxTaskTitle}
                onClick={addTaskHandler}
            >+
            </button>
            {error && <span className={'error-message'}>{error}</span>}
            <TasksList
                tasksList={props.tasksList}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                toDoId={props.id}/>
            <div className={'filters'}>
                <Button isActive={props.filter === 'ALL'} callback={setAllFilterHandler} title={'ALL'}/>
                <Button isActive={props.filter === 'ACT'} callback={setACTFilterHandler} title={'ACT'}/>
                <Button isActive={props.filter === 'COM'} callback={setCOMFilterHandler} title={'COM'}/>
            </div>
        </fieldset>

    );
};
