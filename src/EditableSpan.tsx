import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    className: string
    title: string
    callback: (newTitle:string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [editable, setEditable] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.title)

    const onBlurHandler = () => {
        props.callback(newTitle)
        editableHandler()
    }

    const editableHandler = () => {
        setEditable(!editable)
    }

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editable
            ? <input value={newTitle} onChange={changeValueHandler} onBlur={onBlurHandler}/>
            : <span onDoubleClick={editableHandler} className={props.className}>{props.title}</span>
    );
};

