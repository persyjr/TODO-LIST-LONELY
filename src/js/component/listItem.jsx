import React, { useState } from "react";

const ListItem = (props) => {
	function click() {
		props.delete(props.itemId);
	}
	console.log(props.itemId);
	return (
		<li onClick={click} className="list-group-item list-group-item-action">
			{props.textItem}
		</li>
	);
};
export default ListItem;
