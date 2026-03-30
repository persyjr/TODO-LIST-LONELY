const baseurl = "https://playground.4geeks.com/todo/users/";
//               http://assets.breatheco.de/apis/fake/todos/user/

const cargarlista = async (username) => {
    try {
        let resp = await fetch(`${baseurl}${username}`);
        if (resp.ok ) {
            const data = await resp.json();
            // La API de 4Geeks devuelve un objeto con una propiedad 'todos' que es el array
            return  data; 
        }
        return [];
    } catch (error) {
        return [];
    }
}; 

const crearTarea = async (username, tareaObj) => {
    try {
		const url = `https://playground.4geeks.com/todo/todos/${username}`;
        const resp = await fetch(url, {
            method: "POST",
            body: JSON.stringify(tareaObj),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (resp.ok) {
            return await resp.json(); // La API te devuelve la tarea con su nuevo ID
        }
        return null;
    } catch (error) {
        console.error("Error al crear tarea:", error);
        return null;
    }
};
const crearlista = async (username) => {
	let params = {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
			"Content-Type": "application/json",
		},
	};
	let resp = await fetch(`${baseurl}${username}`, params);
	return resp.ok;
};
// En lista.js
const eliminarTarea = async (todoId) => {
    try {
        const resp = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method: "DELETE"
        });
        // Si el borrado fue exitoso, la API suele devolver un 204 (No Content)
        return resp.ok;
    } catch (error) {
        console.error("Error al eliminar:", error);
        return false;
    }
};
const actualizarlista = async (username, lista) => {
	let params = {
		method: "PUT",
		body: JSON.stringify(lista),
		headers: {
			"Content-Type": "application/json",
		},
	};
	try{

		let resp = await fetch(`${baseurl}${username}`, params);
		if (!resp.ok) {
            // Esto te dirá exactamente qué campo está mal (ej: "label is required")
            const errorData = await resp.json();
            console.log("Respuesta de error del servidor:", errorData);
        }
		return resp.ok;
	}catch(error){
		console.log(error);
		return false;
	}
};
const eliminarlista = async (username) => {
	let params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	};
	let resp = await fetch(`${baseurl}${username}`, params);
	return resp.ok;
};

export { eliminarTarea,crearTarea, cargarlista, crearlista, actualizarlista, eliminarlista };
