import { useState, useEffect } from "react";

import Header from "../Header/Header";
import NewItem from "../NewItem/NewItem";
import TodoList from "../Todo-list/TodoList";
import "./app.scss";
import InformationPanel from "../informationPanel/InformationPanel";

const INITIAL_LIST = [
    {
        id: 1,
        name: "learn JavaScript",
        complete: false,
        del: false
    },
    {
        id: 2,
        name: "learn Html",
        complete: false,
        del: false
    },
    {
        id: 3,
        name: "learn CSS",
        complete: false,
        del: false
    },
    {
        id: 4,
        name: "learn SCSS",
        complete: false,
        del: false
    }
]

const App = () => {
    
    const [list, setList] = useState(INITIAL_LIST);
    const [filtered, setFiltered] = useState(list);

    useEffect(() => {
        setFiltered(list)
    }, [list])
    const addListHandler = (list) => {
        setList(prevList => {
            return [list, ...prevList];
        });
    };

    const removeTask = (id) => {
        setList([...list.filter((list) => list.id !== id)]);
    }

    const handleToggle = (id) => {
        setList([
            ...list.map((list) => list.id === id ? {...list, complete: !list.complete} : {...list})
        ]);
    }

    const handleMouseEnter = (id) => {
        setList([
            ...list.map((list) => list.id === id ? {...list, del: true} : {...list})
        ]);
    }

    const handleMouseOut = (id) => {
        setList([
            ...list.map((list) => list.id === id ? {...list, del: false} : {...list})
        ]);
    }

    const todoFilter = (completed) => {
        if (completed === "all") {
            setFiltered(list)
        } else {
            let newList = [...list].filter(list => list.complete === completed);
            setFiltered(newList)
        }
    }

    return(
        <div className="container">
            <Header/>
            <div className="wrapper">
                <NewItem onAddList={addListHandler}/>
                <TodoList filtered={filtered}
                          onDeleteTask={removeTask}
                          onHandleToggle={handleToggle}
                          onHandleMouseEnter={handleMouseEnter}
                          onHandleMouseOut={handleMouseOut}/>
                <InformationPanel list={list} onFilterSelect={todoFilter}/>
            </div>
        </div>
    );
};

export default App;