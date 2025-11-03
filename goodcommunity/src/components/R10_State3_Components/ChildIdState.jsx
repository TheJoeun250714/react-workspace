import {useState} from "react";

const ChildIdState = (props) => {
    const {handler} = props;
    console.log(handler);
    return(
        <div className="wrapper">
            <label htmlFor="inputId">ID</label>
            <input type="text" id="inputId" onChange={handler}/>

        </div>
    )
}
export default ChildIdState;