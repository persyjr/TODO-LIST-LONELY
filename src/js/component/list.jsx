import React, {useEffect , useState, forwardRef, useImperativeHandle } from "react";
import { eliminarTarea, crearTarea ,cargarlista, actualizarlista } from "../lista.js";
import ListItem from "./listItem.jsx";

//defino e incializo el arreglo items y permito manipular su estado

const List = forwardRef((props, ref) => {
    // 1. Inicializa siempre con un array vacío o con la estructura correcta (objetos)
    const [items, setitems] = useState([]);

    // 2. USA USEEFFECT para cargar la lista una sola vez
    useEffect(() => {
        if (props.username) {
            cargarlista(props.username).then((data) => {
                // Forzamos que sea un array para evitar el error de spread
                setitems(Array.isArray(data.todos) ? data.todos : []);
            });
        }
    }, [props.username]); // Solo se ejecuta cuando el username cambia

    // Dentro de List.jsx, modifica el useImperativeHandle:

useImperativeHandle(ref, () => ({
    newItem: (itemtext) => {
        const nuevoObjeto = { 
            label: itemtext, 
            is_done: false 
            
        };

        // 1. Llamamos a la API para crear una SOLA tarea
        crearTarea(props.username, nuevoObjeto).then((tareaCreada) => {
            if (tareaCreada) {
                // 2. Si la API la creó, la añadimos al estado local
                // 'tareaCreada' ya trae el ID que le asignó el servidor
                setitems(prevItems => [...prevItems, tareaCreada]);
            } else {
                console.error("No se pudo crear la tarea en el servidor");
            }
        });
    },
}));

function deleteItem(id) {
	const itemsTemp = items.filter((_, index) => index !== id);
	setitems(itemsTemp);
	eliminarTarea(items[id].id).then((ok) => {
		if (ok) {
			console.log("Tarea eliminada");
		} else {
			console.log("No se pudo eliminar la tarea");
		}
	});
}

    return (
        <ul className="list-group">
            {/* Validamos que items sea iterable antes de hacer map */}
            {Array.isArray(items) && items.map((item, id) => (
                <ListItem
                    textItem={item.label} // Ahora item siempre será un objeto {label: ...}
                    key={id}
                    itemId={id}
                    delete={deleteItem}
                />
            ))}
            <li className="list-group-item">{items.length} items left</li>
        </ul>
    );
});
export default List;
