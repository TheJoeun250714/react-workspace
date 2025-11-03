import {useState} from "react";
import ChildIdState from "./ChildIdState";
import ChildPwState from "./ChildPwState";

const ParentState = () => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const idHandler = (e) => {
        setId(e.target.value);
    };

    const pwHandler = (e) => {
        setPw(e.target.value);
    };

    return (
        <>
            <ChildIdState handler={idHandler} />
            <ChildPwState handler={pwHandler} />
            <div className="wrapper">
                <button disabled={id.length === 0 || pw.length === 0} >
                    Login
                </button>
            </div>

        </>
    );
};

export default ParentState;