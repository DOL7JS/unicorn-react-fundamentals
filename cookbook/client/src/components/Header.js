import headerStyle from "../css/Header.css"

function Header(props) {
    return (<>
        <h1 className={headerStyle.header}>
            {props.title}
        </h1>
    </>);
}

export default Header;