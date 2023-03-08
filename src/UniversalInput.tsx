import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type PropsType = {
    callback: (title: string) => void
}
export const UniversalInput = (props: PropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string>('')

    const addNewTaskHandler = () => {
        value.trim() === '' ? setError('enter title pls') :
            props.callback(value)
        setValue('')
    }
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (e.currentTarget.value.trim().length === 0) {
            setError('err')
        } else {
            setError('')

        }
    }
    return (
        <div>
            {/*<input value={value} onChange={inputHandler} type={'text'}/>*/}
            <TextField value={value} onChange={inputHandler} id="outlined-basic" label="Required*" variant="outlined" size={'small'}/>
            <IconButton aria-label="delete" onClick={addNewTaskHandler} color="primary">
                <AddBoxIcon/>
            </IconButton>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

//export default UniversalInput;