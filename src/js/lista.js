const baseurl = "https://assets.breatheco.de/apis/fake/todos/user/";
//               https://assets.breatheco.de/apis/fake/todos/user/

const cargarlista = async (username) => {
	/*;let resp = await (`${baseurl}${username}`);
	let data = await resp.json();
	return data;*/
	let resp = await fetch(`${baseurl}${username}`); //await me permite esperar de manera asincrona la respuesta del fetch
	//FETCH ES una funcion asincrona por tanto lo que escriba mientras se resuelve la promes se va a ejecutar, como un codigo en el lugar de este comentario se declara asincrona para usar el await
	if (resp.ok) return await resp.json();
	return [];
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

const actualizarlista = async (username, lista) => {
	let params = {
		method: "PUT",
		body: JSON.stringify(lista),
		headers: {
			"Content-Type": "application/json",
		},
	};
	let resp = await fetch(`${baseurl}${username}`, params);
	return resp.ok;
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

export { cargarlista, crearlista, actualizarlista, eliminarlista };
