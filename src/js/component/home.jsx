import React, { useRef } from "react";
//importando componentes
import List from "./list.jsx";

//create your first component
const Home = () => {
	const listRef = useRef();
	function addItem(e) {
		e.preventDefault(); //e.preventDefault() me impide que se recargue la pagina (e) evento
		//se crea un objeto form.Data con los datos del formulario
		let Data = new FormData(e.target); //estoy crendo una instancia temporal llamada formData (data del formulario) (e.target)me permite tomar la info del input
		//Se obtiene el nuevo item del formulario (e.data)=(document.querySelector(#id_del_form))
		//especifico el elemento al cual le obtengo la info
		let newItem = Data.get("newItem");
		//Se establece el estado del items  al mismo arreglo con el nuevo elemento al final
		//se obtiene el nuevo item del formulario
		listRef.current.newItem(newItem);

		//reinicia el formulario
		e.target.reset();
	} //3. agrego un nuevo valor directamente desde mi input

	return (
		<div>
			<div className="card border-secondary mb-3">
				<div className="card-header">Example</div>
				<div className="card-body">
					<h5 className="card-title">
						<h1 className="text-center mt-5">todo</h1>
						<form className="form-group" onSubmit={addItem}>
							<label htmlFor="newItem"></label>
							<input
								required
								id="newItem"
								className="form-control"
								placeholder="Porfavor ingrese una nueva Tarea"
								type="text"
								name="newItem"></input>
							{/*<button type="submit">ADD TO LIST</button>*/}
						</form>
					</h5>
				</div>
				<div className="form-group">
					<List ref={listRef} />
					{/*itemsForm es la prop que me permite enlazar el contenido de la lista para que sea devuelto en el componente List */}
				</div>
				<p>
					Made by <a href="https://github.com/persyjr">persyjr</a>,
					with love!
				</p>
			</div>
		</div>
	);
};

export default Home;
