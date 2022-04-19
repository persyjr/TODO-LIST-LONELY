import React from "react";
import ListItem from "./listItem.jsx";

const List = (props) => {
	return (
		<ul className="list-group">
			{props.itemsForm.map(
				//itemsForm es la propiedad de mi componenete list y contiene las tareas
				(itemMap, id) => (
					<ListItem
						textItem={itemMap}
						key={id}
						itemId={id}></ListItem>
				) //itemMap argumento de entrada .map item variable con estado
			)}
		</ul>
	);
};

export default List;
