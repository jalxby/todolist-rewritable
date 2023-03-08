import React, {FC} from 'react';

type ButtonPropsType = {
    title: string
    callback: () => void
    style?: string
}

export const Button: FC<ButtonPropsType> = ({title, callback,style}) => {
    return (
        <button className={style} onClick={callback}>{title}</button>
    );
};
