import React from "react";

const Iten: React.FC<{itemId: number,textItem: string; delete: () => void }> = (props) => {

    return(
        <li
        onClick={props.delete}
        className="list-group-item">{props.textItem}</li>
    )
}

export default Iten;
    