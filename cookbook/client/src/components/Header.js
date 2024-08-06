import headerStyle from "../css/Header.css"
import Icon from "@mdi/react";
import { mdiFoodForkDrink } from '@mdi/js';
function Header(props) {
    return (<>
        <h1 className={headerStyle.header}>
            {props.title}
        </h1>
    </>);
}

export default Header;