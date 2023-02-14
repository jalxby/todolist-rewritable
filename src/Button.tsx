import React, {FC} from 'react';

type ButtonPropsType = {
    buttonTitle: string
    onClickButtonHandler: () => void
}
export const Button: FC<ButtonPropsType> = (props) => {
    return (
        <div>
            <button onClick={props.onClickButtonHandler}>{props.buttonTitle}</button>
        </div>
    );
};

