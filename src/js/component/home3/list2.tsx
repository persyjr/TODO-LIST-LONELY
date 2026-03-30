import React, { useRef, useState } from "react";
import Item from "./item.tsx";
import { cargarlista,crearlista, eliminarlista, crearTarea,eliminarTarea} from "../../lista.js";
interface List2Props {
    usuario: string;
    setUsuario: (val: string) => void;
    className?: string; // El "?" significa que es opcional
    style?: React.CSSProperties; // Para que también acepte el objeto de estilos
}
const List2 = ({ usuario, setUsuario, className, style }: List2Props) => {
    interface Tarea {
        id?: number; // o string, según tu API
        label: string;
        is_done: boolean;
    }
    const [items, setItems] = useState<Tarea[]>([]);
    const [inputValue, setInputValue] = useState("");
    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        setItems([...items, {label: inputValue, is_done: false}]);
        setInputValue("");
        console.log('items :', items);
        crearTarea(usuario, {label: inputValue, is_done: false}).then((tareaCreada) => {
            if (tareaCreada) {
                console.log("Tarea creada en el servidor:", tareaCreada);
            } else {
                console.error("No se pudo crear la tarea en el servidor");
            }
        });
    }

    const deleteItem = (id: number) => {
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
    const searchUser = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('inputValue',inputValue)
        try {
             cargarlista(inputValue).then((data) => {
                console.log('data:', data);
                if (data.todos) {

                    setUsuario(inputValue);
                    console.log('Usuario encontrado:', inputValue);
                    console.log('Data cargada:', data);
                    setItems(data.todos);
                    
                }else {
                    console.log('Usuario no encontrado, creando nuevo usuario:', inputValue);
                    crearlista(inputValue).then((ok) => {
                        if (ok) {
                            console.log('Nuevo usuario creado:', inputValue);
                            setUsuario(inputValue);
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
        setUsuario("");
        setItems([]);
        eliminarlista(usuario).then((ok) => {
            if (ok) {
                console.log('Lista eliminada para usuario:', usuario);
            } else {
                console.log('Error al eliminar la lista para usuario:', usuario);
            }
        });
    }
return (
    <>
    <form action="" onSubmit={ usuario ? addItem:searchUser}> 

    <div className="card">
        <div className="card-header">
            
            <input 
            type="text"
            className="form-control"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            required
            placeholder={usuario ? `Escrbir nueva tarea   ` : "Ingrese su nombre de usuario"}
            />
        </div>
        <div className="card-body">
            {usuario && ( 
                items.map((item, key) => 
                    <Item 
                textItem={item.label} 
                key={key}
                itemId={key}
                delete={() => deleteItem(key)}
                />)
            )}
            {!!usuario && (<button onClick={Eliminnarlista} className="btn btn-danger w-100" type="button">Eliminar lista de {usuario}</button>)}
        </div>

    </div>
    </form>
    </>
    )
}

export default List2;