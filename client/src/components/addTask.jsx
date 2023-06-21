import {useState} from "react";
import {useDispatch} from "react-redux";
import {createTask} from "../redux/fuatures/task/taskSlice";
import {AiOutlineDown} from "react-icons/ai";

const AddTask = () => {
    const [task, setTask] = useState("");

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (task.length) {
          try {
            const response = await dispatch(createTask({ task }));
            // Обробка успішної відповіді
            console.log("Task created:", response);
          } catch (error) {
            // Обробка помилки
            console.error("Error creating task:", error);
          }
        }
        setTask("");
      };

    return(
        <form onSubmit={submitHandler} className="form-add-task">
            <AiOutlineDown className="form-add-task__line"/>
            <input type="text"
               className="form-add-task__input"
               placeholder="What needs to de done?"
               value={task}
               onChange={e => setTask(e.target.value)}
                />
        </form>
    );
}

export default AddTask;