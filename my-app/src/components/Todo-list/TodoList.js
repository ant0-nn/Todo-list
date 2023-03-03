import TodoListItem from "../Todo-list-item/TodoListItem";
import "./todoList.scss";

const TodoList = ({filtered, onDeleteTask, onHandleToggle, onHandleMouseEnter, onHandleMouseOut}) => {
    return(
        <ul className="list" >
            {filtered.map((list) => (<TodoListItem
            key={list.id}
            name={list.name}
            complete={list.complete}
            del={list.del}
            onHandleMouseOut={() => onHandleMouseOut(list.id)}
            onHandleMouseEnter={() => onHandleMouseEnter(list.id)}
            onDeleteTask={() => onDeleteTask(list.id)}
            onHandleToggle={() => onHandleToggle(list.id)}/>))}

        </ul>
    )
}

export default TodoList;