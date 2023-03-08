import React, {ChangeEvent, FC} from 'react';
import {DataType} from "./App";
import s from './TaskList.module.css'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import {FavoriteBorder} from "@mui/icons-material";
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

type TasksListProps = {
    toDoId: string
    tasks: Array<DataType>
    changeTaskStatus: (toDoId: string, taskId: string, isDone: boolean) => void
    removeTask: (toDoId: string, taskId: string) => void
    updateTaskTitle: (toDoId: string, taskId: string, newTitle: string) => void
}
export const TasksList: FC<TasksListProps> = ({tasks, toDoId, ...props}) => {

    const tasksList = tasks.map(t => {
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(toDoId, t.id, e.currentTarget.checked)
        }
        const removeTaskHandler = () => {
            props.removeTask(toDoId, t.id)
        }
        const updateTaskTitleWrapper = (newTitle: string) => {
            props.updateTaskTitle(toDoId, t.id, newTitle)
        }
        const className = `${t.isDone ? s.basic + ' ' + s.completed : s.basic}`
        return (
            <div key={t.id}>
                <Checkbox onChange={changeTaskStatusHandler} icon={<RadioButtonUncheckedRoundedIcon />} checked={t.isDone} checkedIcon={<TaskAltRoundedIcon />} />
                <EditableSpan className={className} callback={updateTaskTitleWrapper} title={t.title}/>
                <IconButton aria-label="delete" onClick={removeTaskHandler} color="primary">
                    <RemoveIcon/>
                </IconButton>
            </div>
        )
    })

    return (
        <div>
            <div>{tasksList}</div>
        </div>
    );
};

//export default TasksList;