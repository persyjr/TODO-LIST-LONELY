import React from "react";

const Iten= (props) => {

    return(
        <li
        onClick={props.delete}
        className="list-group-item">{props.textItem}</li>
    )
}

export default Iten;
    