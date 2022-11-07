import "./Navbar.css";
import { ActionMode } from "constants/index";
import logo from "assets/logo.png";
import addNote from "assets/+notas.png";
import edit from "assets/editar.png";
import clear from "assets/apagar.png";

function Navbar({ createNote, editNote, currentMode, deleteNote }) {
  return (
    <div className="Home__header Header">
      <div className="row">
        <div className="Header__logo Logo">
          <img
            src={logo}
            width="70px"
            alt="Logo Note"
            className="Logo__icone"
          />
          <span className="Logo__titulo"> Notes </span>
        </div>
        <div className="Header__opcoes Opcoes">
          {/* Editar nota */}
          <button
            type="button"
            className={`Opcoes__note Note ${
              currentMode === ActionMode.EDIT && "Note__active"
            }`}
            onClick={() => editNote()}
          >
            <img
              src={edit}
              width="145px"
              className="Note__icone"
              alt="Editar Nota"
            />
          </button>

          <button
            type="button"
            className={`Opcoes__note Note ${
              currentMode === ActionMode.DELETE && "Note--delete"
            }`}
            onClick={() => deleteNote()}
          >
            <img
              src={clear}
              width="151px"
              className="Note__icone"
              alt="Delete note"
            />
          </button>

          {/* Criar nota */}
          <button
            disabled={currentMode !== ActionMode.NORMAL}
            type="button"
            className="Opcoes__note Note"
            onClick={() => createNote()}
          >
            <img
              src={addNote}
              width="155px"
              className="Note__icone"
              alt="Adicionar Nota"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
