import React, {FC} from 'react';
import {TasksListType} from "./App";

type TasksListPropsType = {
    tasksList: TasksListType
}

export const TasksList: FC<TasksListPropsType> = (props) => {

    const tasks = props.tasksList.length
        ? props.tasksList.map(t => {
            return (
                <li key={t.id}>
                    <input onChange={()=>{}} type={"checkbox"} checked={t.isDone}/>
                    <span>{t.taskTitle}  </span>
                    <button>x</button>
                </li>
            )
        })
        : <span>list is empty</span>

    return (
        <div>
            <ul>
                {tasks}
            </ul>
        </div>
    )
}

