import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { NoteService } from "services/NoteService";
import "./AddNoteModal.css";
function AddNoteModal({ closeModal, onCreateNote }) {
  const form = {
    name: "",
    duration: "",
    completed: "",
    levelOfImportance: "",
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  //Verifica se todos os campos do form estão preenchidos
  const [canDisable, setCanDisable] = useState(true);
  const canDisableSendButton = () => {
    const response = !Boolean(
      state.name.length &&
        state.completed.length &&
        state.duration.length &&
        state.levelOfImportance.length
    );
    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const createNote = async () => {
    const { name, duration, completed, levelOfImportance } = state;

    const note = {
      name,
      duration,
      completed,
      levelOfImportance,
    };

    const response = await NoteService.create(note);
    onCreateNote(response);
    closeModal();
  };



  return (
    <Modal closeModal={closeModal}>
      <div className="AddNoteModal">
        <form autoComplete="off">
          <h2>Adicionar nota</h2>
          <div>
            <label htmlFor="name" className="AddNoteModal__text">
              Nome:{" "}
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nome da nota"
              value={state.name}
              onChange={(e) => handleChange(e, "name")}
              required
            />
          </div>
          <div>
            <label htmlFor="duration" className="AddNoteModal__text">
              Duração:{" "}
            </label>
            <input
              id="duration"
              type="text"
              placeholder="Duração da nota"
              value={state.duration}
              onChange={(e) => handleChange(e, "duration")}
              required
            />
          </div>
          <div>
            <label htmlFor="completed" className="AddNoteModal__text">
              Situação:{" "}
            </label>
            <input
              id="completed"
              type="text"
              placeholder="Você já finalizou esta nota?"
              value={state.completed}
              onChange={(e) => handleChange(e, "completed")}
              required
            />
          </div>
          <div>
            <label htmlFor="levelOfImportance" className="AddNoteModal__text">
              Importância:{" "}
            </label>
            <input
              id="levelOfImportance"
              type="text"
              placeholder="Média | Baixa | Alta"
              value={state.levelOfImportance}
              onChange={(e) => handleChange(e, "levelOfImportance")}
              required
            />
          </div>
          <button
            type="button"
            disabled={canDisable}
            className="AddNoteModal__env"
            onClick={createNote}
          >
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddNoteModal;
