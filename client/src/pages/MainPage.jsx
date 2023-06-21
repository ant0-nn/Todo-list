import AddTask from "../components/addTask";
import {useSelector} from "react-redux"
import { checkIsAuth } from "../redux/fuatures/auth/authSlice";
import Task from "../components/Task";
import Filter from "../components/Filter";

const MainPage = () => {
    const isAuth = useSelector(checkIsAuth);
    return(
        <div className="main-page">
            <div className="container">
                <h1 className="main-page__title">Your tasks</h1>
                <div className="main-page__block">
                    {isAuth ? (
                        <div className="main-page__wrapper">
                            <AddTask/>
                            <Task/>
                            <Filter/>
                        </div>
                    ) : (
                        <h2 className="main-page__start">To start using, log in</h2>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainPage;