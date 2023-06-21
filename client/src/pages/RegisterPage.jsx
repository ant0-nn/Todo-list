import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { registerUser, checkIsAuth } from "../redux/fuatures/auth/authSlice";
import {toast} from "react-toastify"

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {status} = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(status) toast(status)
        if(isAuth) navigate("/")
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({username, password}))
            setPassword("")
            setUsername("")
        } catch (e) {
            console.log(e);
        }
    }
    return(
        <div className="container">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <h2 className="form__title">Sign up</h2>
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
                        Sign up
                    </button>
                    <Link to="/login"
                        className="form__link">
                        You have an account?
                    </Link>
                </div>
            </form> 
        </div>
    )
}

export default RegisterPage;