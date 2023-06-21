import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginUser, checkIsAuth } from "../redux/fuatures/auth/authSlice";
import {toast} from "react-toastify";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status) toast(status)
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="container">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <h2 className="form__title">Sign in</h2>
                <label className="form__label">
                    Username:
                    <input type="text" 
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                           className="form__input"
                           placeholder="Username"/>
                </label>
                <label className="form__label">
                    Password:
                    <input type="password" 
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           className="form__input"
                           placeholder="Username"/>
                </label>
                <div className="form__submit">
                    <button type="submit"
                            className="button"
                            onClick={handleSubmit}>
                        Sign in
                    </button>
                    <Link to="/register"
                        className="form__link">
                        You don't have an account?
                    </Link>
                </div>
            </form> 
        </div>
    )
}

export default LoginPage;