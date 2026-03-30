import React, { useRef, useState } from "react";
import Item from "./item.jsx";
import { cargarlista,crearlista, eliminarlista, crearTarea,eliminarTarea} from "../../lista.js";

const List2 =(props) => {
    const [items,setItems] = useState([{label:"Hacer la cama", done: false}]);
    const [inputValue, setInputValue] = useState("");
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, {label: inputValue, done: false}]);
        setInputValue("");
        console.log('items :', items);
        crearTarea(props.usuario, {label: inputValue, done: false}).then((tareaCreada) => {
            if (tareaCreada) {
                console.log("Tarea creada en el servidor:", tareaCreada);
            } else {
                console.error("No se pudo crear la tarea en el servidor");
            }
        });
    }

    const deleteItem = (id) => {
        const itemsTemp = items.filter((_, index) => index !== id);
        setItems(itemsTemp);
        eliminarTarea(items[id].id).then((ok) => {
            if (ok) {
                console.log("Tarea eliminada");
            } else {
                console.log("No se pudo eliminar la tarea");
            }
        });
    }
    const searchUser = (e) => {
        e.preventDefault();
        console.log('inputValue',inputValue)
        try {
             cargarlista(inputValue).then((data) => {
                console.log('data:', data);
                if (data.todos) {

                    props.setUsuario(inputValue);
                    console.log('Usuario encontrado:', inputValue);
                    console.log('Data cargada:', data);
                    setItems(data.todos);
                    
                }else {
                    console.log('Usuario no encontrado, creando nuevo usuario:', inputValue);
                    crearlista(inputValue).then((ok) => {
                        if (ok) {
                            console.log('Nuevo usuario creado:', inputValue);
                            props.setUsuario(inputValue);
                            setItems([]);
                        } else {
                            console.log('Error al crear el usuario:', inputValue);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error searching user:', error);
        }
    }

    const Eliminnarlista = () => {
        props.setUsuario("");
        setItems([]);
        eliminarlista(props.usuario).then((ok) => {
            if (ok) {
                console.log('Lista eliminada para usuario:', props.usuario);
            } else {
                console.log('Error al eliminar la lista para usuario:', props.usuario);
            }
        });
    }
return (
    <>
    <form action="" onSubmit={ props.usuario ? addItem:searchUser}> 

    <div className="card">
        <div className="card-header">
            
            <input 
            type="text"
            className="form-control"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            required
            placeholder={props.usuario ? `Escrbir nueva tarea   ` : "Ingrese su nombre de usuario"}
            />
        </div>
        <div className="card-body">
            {props.usuario && ( 
                items.map((item, key) => 
                    <Item 
                textItem={item.label} 
                key={key}
                itemId={key}
                delete={() => deleteItem(key)}
                />)
            )}
            {!!props.usuario && (<button onClick={Eliminnarlista} className="btn btn-danger w-100" type="button">Eliminar lista de {props.usuario}</button>)}
        </div>

    </div>
    </form>
    </>
    )
}

export default List2;