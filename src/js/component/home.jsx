import React from "react";
//importando componentes
import List from "./list.jsx";

//create your first component
const Home = () => {
	function addItem(e) {
		e.preventDefault(); //e.preventDefault() me impide que se recargue la pagina (e) evento
		//se crea un objeto form.Data con los datos del formulario
		let Data = new FormData(e.target); //estoy crendo una instancia temporal llamada formData (data del formulario) (e.target)me permite tomar la info del input
		//Se obtiene el nuevo item del formulario (e.data)=(document.querySelector(#id_del_form))
		//especifico el elemento al cual le obtengo la info
		let newItem = Data.get("newItem");
		//Se establece el estado del items  al mismo arreglo con el nuevo elemento al final
		setitems([...items, newItem]); //estoy cambiando el estado de mi arreglo  directamente desde el imput. 1 genero un nuevo arreglo con setitems,2. deconstruyo conservando arreglo anterior (...items)
		//reinicia el formulario
		e.target.reset();
	} //3. agrego un nuevo valor directamente desde mi input

	return (
		<div>
			<div className="card border-secondary mb-3">
				<div className="card-header">Todo List 4Geeks</div>
				<div className="card-body">
					<h5 className="card-title">
						<h1 className="text-center mt-5">TODO LIST</h1>
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
					<List />
					{/*itemsForm es la prop que me permite enlazar el contenido de la lista para que sea devuelto en el componente List */}
				</div>
				<p>
					Made by{" "}
					<a href="http://www.4geeksacademy.com">4Geeks Academy</a>,
					with love!
				</p>
			</div>
		</div>
	);
};

export default Home;
