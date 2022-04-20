import React, { useState } from "react";
import ListItem from "./listItem.jsx";

const List = () => {
	//defino e incializo el arreglo items y permito manipular su estado
	const [items, setitems] = useState([
		"Inspección de recibo",
		"lista de chequeo",
		"limpieza general",
	]);
	function deleteItem(id) {
		console.log("eliminando el " + id);
	}
	return (
		<ul className="list-group">
			{items.map(
				//itemsForm es la propiedad de mi componenete list y contiene las tareas
				(itemMap, id) => (
					<ListItem
						textItem={itemMap}
						key={id}
						itemId={id}
						delete={deleteItem}></ListItem>
				) //itemMap argumento de entrada .map item variable con estado
			)}
		</ul>
	);
};

export default List;
