import React from "react"; //Importa a biblioteca react
import 'assets/styles/main.css'
import ReactDOM from "react-dom"; // Importa a biblioteca react dom, que utilizo para renderizar os componentes em tela
import Home from "./views/Home/Home";

ReactDOM.render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>,
  document.getElementById("root")
);
