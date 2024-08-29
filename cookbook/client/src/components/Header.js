import headerStyle from "../css/Header.module.css"
import {useNavigate} from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();
    return (
        <h1
            onClick={()=>{navigate('/home')}}
            className={headerStyle.header}>
            {props.title}
        </h1>
    );
}

export default Header;