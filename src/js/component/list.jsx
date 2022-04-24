import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useEffect,
} from "react";
import { cargarlista, actualizarlista } from "../lista.js";
import ListItem from "./listItem.jsx";

//defino e incializo el arreglo items y permito manipular su estado

const List = forwardRef((props, ref) => {
	//permite ceder el control de mi componente al dom
	//metodo de control de componente para dar control en el dom, permite llamar un metodo del componente list
	//este componente list tiene un metodo que puede ser llamado por el padre home los metodos que usare se declaran
	//en el imperative handle en este caso es la funcion NEW ITEM (newItem)
	//setitems([...items, newItem]); //estoy cambiando el estado de mi arreglo  directamente desde el imput. 1 genero un nuevo arreglo con setitems,2. deconstruyo conservando arreglo anterior (...items)
	const [items, setitems] = useState([
		"Inspección de recibo",
		"lista de chequeo",
		"limpieza general",
	]);

	useImperativeHandle(ref, () => ({
		newItem: (itemtext) => {
			const newArray = [...items, { label: itemtext, done: false }];
			actualizarlista(props.username, newArray).then((ok) => {
				if (ok) setitems(newArray);
			});
			setitems(newArray);
		}, //componente items puede usar metodos de otro componente desde el componente padre home
	}));

	cargarlista(props.username).then((data) => setitems(data));

	function deleteItem(id) {
		console.log("eliminando el " + id);
		let itemsTemp = [...items];
		itemsTemp.splice(id, 1);
		//actualizar la api //actualizo en mi API
		//const actualizada = actualizarlista("Adelmo", itemsTemp);
		actualizarlista(props.username, itemsTemp).then((actualizada) => {
			if (actualizada) setitems(itemsTemp);
		});
	}
	return (
		<ul className="list-group">
			{items.map(
				(item, id) => (
					//itemsForm es la propiedad de mi componenete list y contiene las tareas
					<ListItem
						textItem={item.label}
						key={id}
						itemId={id}
						delete={deleteItem}></ListItem>
				) //itemMap argumento de entrada .map item variable con estado
			)}
		</ul>
	);
});

export default List;
