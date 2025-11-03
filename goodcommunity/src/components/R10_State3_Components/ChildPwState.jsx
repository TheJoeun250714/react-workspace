import {useState} from "react";


const ChildPwState = ({handler}) => {
    return(
        <div className="wrapper">
            <label>PW
                <input type="password" id="inputPw" onChange={handler} />
            </label>
        </div>
    )
}

export default ChildPwState;