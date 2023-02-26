import React, {FC} from 'react';
import './App.css'

type ButtonPropsType = {
    callback: () => void
    title: string
    isActive: boolean
}

export const Button: FC<ButtonPropsType> = ({callback, title, ...props}) => {
    return (
        <button className={`${props.isActive && 'active-filter'}`} onClick={callback}>{title}</button>
    );
};
