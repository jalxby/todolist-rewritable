import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type TasksListType = {
    tasksList: Array<TaskType>
    toDoId: string
    removeTask: (taskId: string, toDoId: string) => void
    changeTaskStatus: (taskId: string, toDoId: string, isDone: boolean) => void
}

export const TasksList: FC<TasksListType> = (props) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const tasks = props.tasksList.map(t => {
        return (
            <li key={t.id}>
                <input
                    type={"checkbox"}
                    checked={t.isDone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, props.toDoId, e.currentTarget.checked)}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id, props.toDoId)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <ul ref={listRef}>
                {tasks}
            </ul>
        </div>
    );
};
