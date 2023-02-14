import React, {FC} from 'react';
import {TasksList} from "./TasksList";
import {FilterType, TasksListType} from "./App";
import {Button} from "./Button";
import s from "./ToDoList.module.css"
import {v1} from "uuid";

type ToDoListPropsType = {
    todoListTitle: string
    tasksList: TasksListType
    buttonsTitle: Array<FilterType>
    setFilter: (filter: FilterType) => void
}

export const ToDoList: FC<ToDoListPropsType> = (props) => {



    const buttons = props.buttonsTitle.map(b => {
        const setFilterOnButton = () => props.setFilter(b)
        return (
            <Button key={v1()} buttonTitle={b} onClickButtonHandler={setFilterOnButton}/>
        )
    })

    return (
        <div>
            <fieldset>
                <legend><h3>{props.todoListTitle}</h3></legend>
                <div>
                    <input type="text"/>
                    <button>+</button>
                </div>
                <TasksList tasksList={props.tasksList}/>
                <div className={s.buttons}>
                    {buttons}
                </div>
            </fieldset>
        </div>
    );
};

