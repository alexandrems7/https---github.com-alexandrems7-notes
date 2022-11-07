import { useState } from "react";
import { ActionMode } from "constants/index";
import Navbar from "components/Navbar/Navbar";
import ToDoList from "components/ToDoList/ToDoList";
import AddEditNoteModal from "components/AddEditNoteModal/AddEditNoteModal";
import DeleteNoteModal from "components/DeleteNoteModal/DeleteNoteModal";
import "./Home.css";

function Home() {
  const [noteEdited, setNoteEdited] = useState();

  const [canShowAddNoteModal, setCanShowAddNoteModal] = useState(false);

  const [noteForAdd, setNoteForAdd] = useState();

  const [noteRemoved, setNoteRemoved] = useState();

  const [currentMode, setCurrentMode] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const newAction = currentMode === action ? ActionMode.NORMAL : action;
    setCurrentMode(newAction);
  };

  const [noteForEdit, setNoteForEdit] = useState();
  const [noteForDelete, setNoteForDelete] = useState();

  const handleDeleteNote = (noteToDelete) => {
    setNoteForDelete(noteToDelete);
  };

  const handleEditNote = (noteToEdit) => {
    setNoteForEdit(noteToEdit);
    setCanShowAddNoteModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAddNoteModal(false);
    setNoteForAdd();
    setNoteForDelete();
    setNoteForEdit();
    setCurrentMode(ActionMode.NORMAL);
  };

  return (
    <div className="Home">
      <Navbar
        currentMode={currentMode}
        createNote={() => setCanShowAddNoteModal(true)}
        deleteNote={() => handleActions(ActionMode.DELETE)}
        editNote={() => handleActions(ActionMode.EDIT)}
      />

      <div className="Home__container">
        <ToDoList
          currentMode={currentMode}
          noteCreated={noteForAdd}
          noteEdited={noteEdited}
          noteRemoved={noteRemoved}
          deleteNote={handleDeleteNote}
          editNote={handleEditNote}
        />
        {canShowAddNoteModal && (
          <AddEditNoteModal
            currentMode={currentMode}
            noteToEdit={noteForEdit}
            onUpdateNote={(note) => setNoteEdited(note)}
            closeModal={handleCloseModal}
            onCreateNote={(note) => setNoteForAdd(note)}
          />
        )}
        {noteForDelete && (
          <DeleteNoteModal

          noteForDelete={noteForDelete}
            closeModal={handleCloseModal}
            onDeleteNote={(note) => setNoteRemoved(note)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
