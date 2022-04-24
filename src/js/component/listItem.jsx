import React, { useState } from "react";

const ListItem = (props) => {
	function click() {
		props.delete(props.itemId);
	}
	console.log(props.itemId);
	return (
		<div className="container-fluid">
			<div className=" row ">
				<div
					onClick={click}
					className="col list-group-item  list-group-item-action ">
					{props.textItem}
				</div>
				<div className=" list-group-item  divcerrar ">x</div>
			</div>
		</div>
	);
};
export default ListItem;
