import NavBar from "./NavBar";

const Header = () => {
    return(
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <h1 className="header__logo">TodoList</h1>
                    <NavBar/>
                </div>
            </div>
        </header>
    );
}

export default Header;