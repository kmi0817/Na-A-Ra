import React from "react";
import MenuBar from '../components/MenuBar'

function Notfound({ location, history }) {
    return (
        <div className="errorsection">
            <MenuBar></MenuBar>
            <h1>404 Not found...</h1>
        </div>
    );
}

export default Notfound;