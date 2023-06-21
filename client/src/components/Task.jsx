import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyAllTask, removeMyTask, updateTask } from "../redux/fuatures/task/taskSlice";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";

const AllTask = () => {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const dispatch = useDispatch();
  const allTaskList = useSelector((state) => state.task.tasks);
  const filter = useSelector((state) => state.task.filter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMyAllTask());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredTasks = allTaskList.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    } else if (filter === "completed") {
      return task.completed;
    } else {
      return true;
    }
  });

  const removeTaskHandler = async (taskId) => {
    try {
      await dispatch(removeMyTask(taskId));
      toast("The task has been deleted");
      await dispatch(getMyAllTask());
    } catch (e) {
      console.log(e);
    }
  };

  const toggleTaskStatus = async (id, completed) => {
    try {
      const updatedTask = { id, completed };
      await dispatch(updateTask(updatedTask));
    } catch (e) {
      console.log(e);
    }
  };

  const handleMouseEnter = (taskId) => {
    setHoveredTaskId(taskId);
  };

  const handleMouseLeave = () => {
    setHoveredTaskId(null);
  };

  return (
    <div className="task">
      <div className="task__list">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="task__item"
            onMouseEnter={() => handleMouseEnter(task._id)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="task__circle"
              onClick={() => toggleTaskStatus(task._id, task.completed)}
            >
              {task.completed ? (
                <AiOutlineCheck className="task__completed active" />
              ) : (
                <AiOutlineCheck className="task__completed" />
              )}
            </div>
            <p className={`task__text ${task.completed ? "completed" : ""}`}>{task.task}</p>
            {hoveredTaskId === task._id && (
              <AiOutlineClose
                className="task__delete"
                onClick={() => removeTaskHandler(task._id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
