import './DeleteNoteModal.css'
import Modal from "components/Modal/Modal";
import { NoteService } from "services/NoteService";



function DeleteNoteModal ({closeModal, noteForDelete, onDeleteNote}) {

    const handleDelete = async (note) => {
        await NoteService.deleteById(note.id);
        onDeleteNote(note);
        closeModal();
    };
    
    return (
        
        <Modal closeModal={closeModal}>
      <div className="DeleteNoteModal">
        <h2>Confirmação</h2>
        <p>
          Você realmente deseja remover <b>{noteForDelete.name}</b> do
          bloco de notas?
        </p>
        <br />
        <div>
          <button
            onClick={() => handleDelete(noteForDelete)}
            className="DeleteNoteModal__confirm"

          >
            {" "}
            Confirmar{" "}
          </button>
          <button onClick={closeModal} className="DeleteNoteModal__cancel">
            {" "}
            Cancelar{" "}
          </button>
        </div>
      </div>
    </Modal>
    )
}

export default DeleteNoteModal;