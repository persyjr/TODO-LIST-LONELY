import React, { useRef, useState } from "react";
import { eliminarlista, crearlista } from "../lista.js";

//importando componentes
import List from "./list.jsx";

//create your first component
const Home = () => {
	const listRef = useRef();

	const [usuario, setUsuario] = useState("");

	function submitForm(e) {
		e.preventDefault(); //e.preventDefault() me impide que se recargue la pagina (e) evento
		//se crea un objeto form.Data con los datos del formulario
		let Data = new FormData(e.target); //estoy crendo una instancia temporal llamada formData (data del formulario) (e.target)me permite tomar la info del input
		//Se obtiene el nuevo item del formulario (e.data)=(document.querySelector(#id_del_form))
		//especifico el elemento al cual le obtengo la info
		if (usuario) {
			//si hay usuario ingresa un item nuevo
			let newItem = Data.get("newItem");
			//Se establece el estado del items  al mismo arreglo con el nuevo elemento al final
			//se obtiene el nuevo item del formulario
		} else {
			//si no hay un usuario, valida la entrada con nombre de usuario
			let username = Data.get("username");
			crearlista(username).then((ok) => {
				if (ok) {
					console.log("Nuevo usuario");
				} else {
					console.log("Usuario ya existente");
				}
				setUsuario(username);
				return;
			});
		}
		//reinicia el formulario
		e.target.reset();
	} //3. agrego un nuevo valor directamente desde mi input
	function cerrarlista() {
		setUsuario("");
	}
	function btnEliminarLista() {
		if (usuario) {
			eliminarlista(usuario).then((ok) => {
				if (ok) cerrarlista();
				return;
			});
		}
	}
	return (
		<div>
			<div className="card border-secondary mb-3">
				<p id="todos" className="card-header  ">
					todos
				</p>
				<div className="card-body ">
					<h5 className="card-title">
						<div className="card-header text-center">
							{usuario ? "ToDo List de " + usuario : "ToDo list"}
							{!!usuario && (
								<button className="close" onClick={cerrarlista}>
									Close User x
								</button>
							)}
						</div>
						<form className="form-group" onSubmit={submitForm}>
							<label htmlFor={usuario ? "newItem" : "username"}>
								{usuario ? "Nueva Tarea" : "Nombre de usuario"}
							</label>
							<input
								required
								id={usuario ? "newItem" : "username"}
								className="form-control"
								placeholder={
									usuario
										? "Nueva tarea"
										: "Porfavor ingrese un nombre de usuario"
								}
								name={usuario ? "newItem" : "username"}></input>
							{/*<button type="submit">ADD TO LIST</button>*/}
						</form>
					</h5>
					{!!usuario && (
						<div className="card-text">
							<List ref={listRef} username={usuario} />
							<button
								onClick={btnEliminarLista}
								className="btn btn-danger btn-block card-link mt-3">
								Eliminar lista
							</button>
						</div>
					)}
				</div>
				<div className="card-footer text-muted">
					<a href="http://www.4geeksacademy.com">
						4Geeks Academy {3}
					</a>
				</div>
			</div>
		</div>
	);
};

export default Home;
