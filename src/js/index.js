//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";          //Arnaldo
import Home2 from "./component/home2/home2.jsx";  //Alejo
//import Home3 from "./component/home3/home3.tsx"; //typescript

//render your react application
ReactDOM.render(<Home2 />, document.querySelector("#app"));
