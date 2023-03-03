import { useState } from "react";

import "./newItem.scss";

const NewItem = (props) => {
    const [name, setName] = useState("");

    const saveTodoItem = (inputListData) => {
        const listData = {
            ...inputListData,
            id: Math.random().toString()
        }
        props.onAddList(listData)
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const listData = {
            name: name,
            complete: false
        };

        setName("");

        if (name.length) {
            saveTodoItem(listData)
        }
    }

    return(
        <form onSubmit={submitHandler} className="form">
            <div className="block">
                <div className="arrow">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>
                <input type="text"
                       value={name}
                       className="forms"
                       placeholder="What needs to de done?"
                       onChange={nameChangeHandler}/>
            </div>
        </form>
    );
}

export default NewItem;