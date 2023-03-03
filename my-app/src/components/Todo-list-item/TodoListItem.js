import "./todoListItem.scss";

const TodoListItem = ({name, complete, del, onDeleteTask, onHandleToggle, onHandleMouseEnter, onHandleMouseOut}) => {
    let clazz = complete ? "task active" : "task";
    let deletes = del ? "delete active" : "delete";
    return(
        <li className="list__items"
            onMouseEnter={onHandleMouseEnter}>
            <div className="list__item" onMouseOut={onHandleMouseOut}>
                <div onClick={onHandleToggle} className="circle"></div>
                <h2 className={clazz}>{name}</h2>
                <div className={deletes} onClick={onDeleteTask}>
                    <div className="left-stick"></div>
                    <div className="right-stick"></div>
                </div>
            </div>
        </li>
    );
};

export default TodoListItem;