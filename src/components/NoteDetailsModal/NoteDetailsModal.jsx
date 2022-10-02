import "./NoteDetailsModal.css";
import Modal from "components/Modal/Modal";

function NoteDetailsModal({note, closeModal}) {
  return (
    <Modal closeModal={closeModal}>
      <div className="NoteDetailsModal">
        <div>
            <div className="NoteDatailsModal__name"><b>{note.name}</b></div>
            <div className="NoteDatailsModal__duration"><b>Duração: </b>{Number(note.duration)}</div>
            <div className="NoteDatailsModal__completed"><b>Você terminou? </b>{note.completed}</div>
            <div className="NoteDatailsModal__levelOfImportance"><b>Nível de importânica: </b>{note.levelOfImportance}</div>
        </div>
      </div>
    </Modal>
  );
}

export default NoteDetailsModal;
