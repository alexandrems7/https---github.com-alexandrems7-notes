import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { NoteService } from "services/NoteService";
import "./AddEditNoteModal.css";

import { ActionMode } from "constants/index";

  
function AddEditNoteModal({ closeModal, onCreateNote, currentMode, noteToEdit, onUpdateNote }) {
  const form = {
      //expressão importante: coalescência nula
    name: noteToEdit?.name ?? "",
    duration: noteToEdit?.duration ??  "",
    completed:  noteToEdit?.completed ?? "",
    levelOfImportance: noteToEdit?.levelOfImportance ??  "",
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
        String(state.duration).length &&
        state.levelOfImportance.length
    );
    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const handleSend = async () => {
    const { name, duration, completed, levelOfImportance } = state;

    const note = {
      ...(noteToEdit && { _id: noteToEdit?.id }),
      name,
      duration,
      completed,
      levelOfImportance,
    };

    const serviceCall = {
      [ActionMode.NORMAL]: () => NoteService.create(note),
      [ActionMode.EDIT]: () => NoteService.updateById(noteToEdit?.id, note),
    }

    const response = await serviceCall[currentMode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreateNote(response),
      [ActionMode.EDIT]: () => onUpdateNote(response),
    }

    actionResponse[currentMode]();

    const reset = {
      name: '',
      duration: '',
      completed: '',
      levelOfImportance: '',
    }

    setState(reset);

    // const response = await NoteService.create(note);
    // onCreateNote(response);

    closeModal();
  };



  return (
    <Modal closeModal={closeModal}>
      <div className="AddNoteModal">
        <form autoComplete="off">
        <h2> { ActionMode.EDIT === currentMode ? 'Atualizar' : 'Adicionar ' } </h2>
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
            onClick={handleSend}
          >
            {ActionMode.NORMAL === currentMode ? "Enviar" : "Atualizar"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddEditNoteModal;
