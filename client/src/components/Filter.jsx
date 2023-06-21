import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setFilter} from "../redux/fuatures/task/taskSlice";

const Filter = () => {
  const filter = useSelector((state) => state.task.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (filterValue) => {
    dispatch(setFilter(filterValue));
  };

  return (
    <div className="filter">
      <button
        className={filter === "all" ? "filter__btn active" : "filter__btn"}
        onClick={() => handleFilterChange("all")}
      >
        All
      </button>
      <button
        className={filter === "active" ? "filter__btn active" : "filter__btn"}
        onClick={() => handleFilterChange("active")}
      >
        Active
      </button>
      <button
        className={filter === "completed" ? "filter__btn active" : "filter__btn"}
        onClick={() => handleFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
