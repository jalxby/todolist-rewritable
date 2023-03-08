import React, {FC} from 'react';
import {TasksList} from "./TasksList";
import {DataType, FilterType} from "./App";
import s from './ToDoList.module.css'
import {UniversalInput} from "./UniversalInput";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@mui/material";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

type ToDoListType = {
    toDoId: string
    title: string
    tasks: Array<DataType>
    applyFilter: (toDoId: string, filter: FilterType) => void
    addNewTask: (toDoId: string, title: string) => void
    removeTask: (toDoId: string, taskId: string) => void
    removeToDoList: (toDoId: string) => void
    changeTaskStatus: (toDoId: string, taskId: string, isDone: boolean) => void
    filter: FilterType
    updateTaskTitle: (toDoId: string, taskId: string, newTitle: string) => void
    updateToDoTitle: (toDoId: string, newTitle: string) => void
}

export const ToDoList: FC<ToDoListType> = (ToDoListProps) => {
    const {toDoId, title, tasks, ...props} = ToDoListProps
    const removeToDoListHandler = () => {
        props.removeToDoList(toDoId)
    }
    const addNewTaskWrapper = (title: string) => {
        props.addNewTask(toDoId, title)
    }

    const updateToDoTitleWrapper = (title: string) => {
        props.updateToDoTitle(toDoId, title)
    }
    const allFilterHandler = () => props.applyFilter(toDoId, 'ALL')
    const actFilterHandler = () => props.applyFilter(toDoId, 'ACT')
    const comFilterHandler = () => props.applyFilter(toDoId, 'COM')

    return (
        <div className={'toDoList'}>
            <span>
            <h3><EditableSpan className={''} title={title} callback={updateToDoTitleWrapper}/>
                {/*<button onClick={removeToDoListHandler}>x</button>*/}
            <IconButton aria-label="delete" onClick={removeToDoListHandler}  color="primary">
                <BookmarkRemoveIcon/>
            </IconButton>
            </h3>
                 </span>
            <div>
                <UniversalInput callback={addNewTaskWrapper}/>
            </div>
            <div>
                <TasksList
                    toDoId={toDoId}
                    tasks={tasks}
                    changeTaskStatus={props.changeTaskStatus}
                    removeTask={props.removeTask}
                    updateTaskTitle={props.updateTaskTitle}
                />
            </div>
            <div>
                {/*<Button style={`${props.filter === 'ALL' ? s.filtered : s.basic}`} title={'ALL'}*/}
                {/*        callback={allFilterHandler}/>*/}
                {/*<Button style={`${props.filter === 'ACT' ? s.filtered : s.basic}`} title={'ACT'}*/}
                {/*        callback={actFilterHandler}/>*/}
                {/*<Button style={`${props.filter === 'COM' ? s.filtered : s.basic}`} title={'COM'}*/}
                {/*        callback={comFilterHandler}/>*/}

                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button className={`${props.filter === 'ALL' ? s.filtered : s.basic}`} onClick={allFilterHandler}>ALL</Button>
                    <Button className={`${props.filter === 'ACT' ? s.filtered : s.basic}`}onClick={actFilterHandler}>ACT</Button>
                    <Button className={`${props.filter === 'COM' ? s.filtered : s.basic}`}onClick={comFilterHandler}>COM</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

