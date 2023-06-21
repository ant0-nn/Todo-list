import { Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { checkIsAuth, logout } from "../redux/fuatures/auth/authSlice";
import {toast} from "react-toastify";

const NavBar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const logouthandler = () => {
        dispatch(logout());
        window.localStorage.removeItem("token");
        toast("You are logged out");
    }
    return(
        <main className="nav-bar">
            {isAuth ? (
                <div className="nav-bar__wrapper">
                    <button className="button" onClick={logouthandler}>
                        Log out
                    </button>
                </div>
            ) : (
                <div className="nav-bar__sign">
                    <Link to={"/login"}><button className="button">Sign in</button></Link>
                    <Link to={"/register"}><button className="button">Sign up</button></Link>
                </div>
            ) }
        </main>
    );
}

export default NavBar;