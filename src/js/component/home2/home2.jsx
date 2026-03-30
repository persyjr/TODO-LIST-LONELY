import React, { useState, useEffect} from "react";
import List2 from "./list2.jsx";

const Home2 = () =>{
    const [usuario, setUsuario] = React.useState("");
    const cerrarlista = () => {
		setUsuario("");
	}
return(
    <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">

                        <h1 >
                            {!!usuario ? `Bienvenido ${usuario}` : "Ingrese su nombre de usuario"} 
                        </h1>    
                            {!!usuario && 
                                (<button className="close  btn btn-outline-danger" onClick={cerrarlista}>
									Close User x
								</button>)
                            }
                        </div>
                                                                   
                            <List2 
                                className="list-group list-group-flush"
                                style={{ 
                                    backgroundColor: 'blue', 
                                    fontSize: '16px',
                                    padding: '10px' 
                                }} 
                                usuario={usuario}
                                setUsuario={setUsuario}
                             />
                    </div>
                    <div className="card-footer">
                        <a href="http://www.4geeksacademy.com">4Geeks Academy</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
export default Home2;