import React, { useState } from "react";

const ListItem = (props) => {
	console.log(props.itemId);
	return <li className="list-group-item">{props.textItem}</li>;
};
export default ListItem;
