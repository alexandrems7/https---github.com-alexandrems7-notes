import './Navbar.css'
import logo from "assets/logo.png"
import addNote from "assets/+notas.png"
function Navbar({createNote}){
    return(
        <div className="Home__header Header">
        <div className="row">
          <div className="Header__logo Logo">
            <img
              src={logo}
              width="70px"
              alt="Logo El Geladon"
              className="Logo__icone"
            />
            <span className="Logo__titulo"> Notes </span>
          </div>
          <div className="Header__opcoes Opcoes"> 
            <button type="button" className="Opcoes__note Note" onClick={()=>createNote()}>
              <img src={addNote} width="150px" className="Note__icone" alt="Adicionar Nota" />
            </button>
          </div>
        </div>
      </div>
    );
}

export default Navbar;