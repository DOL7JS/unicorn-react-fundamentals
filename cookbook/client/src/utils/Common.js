import styles from "../css/States.module.css";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";


export function getErrorPage(recipeLoadCall) {
    return <>
        <div className={styles.error}>
            <div>Nepodařilo se načíst data o receptech.</div>
            <br/>
            <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
        </div>
    </>;
}

export function getPendingPage() {
    return <>
        <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true}/>
        </div>
    </>;
}