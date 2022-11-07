import React, { useState, useEffect, useCallback } from "react";
import ToDoListItem from "components/ToDoListItem/ToDoListItem";
import { NoteService } from "services/NoteService";
import NoteDetailsModal from "components/NoteDetailsModal/NoteDetailsModal";
import "./ToDoList.css";
import { ActionMode } from "constants/index";
function ToDoList({ noteCreated, currentMode, editNote, deleteNote, noteEdited, noteRemoved}) {
  const [toDoList, setNotes] = useState([]);

  const [noteSelected, setNoteSelected] = useState({});

  const [noteModal, setNoteModal] = useState(false);

  const addNote = (noteIndex) => {
    const note = { [noteIndex]: Number(noteSelected[noteIndex] || 0) + 1 };

    //Adiciono em notaSelecionada, o valor da variável nota, que é alterada a cada clique que eu der
    setNoteSelected({ ...noteSelected, ...note });
  };

  const removeNote = (noteIndex) => {
    const note = { [noteIndex]: Number(noteSelected[noteIndex] || 0) - 1 };
    setNoteSelected({ ...noteSelected, ...note });
  };

  const noteAll = async () => {
    const response = await NoteService.getAll();
    setNotes(response);
  };

  const noteById = async (noteId) => {
    const response = await NoteService.getById(noteId);
    const mapper = {
      [ActionMode.NORMAL]: () => setNoteModal(response),
      [ActionMode.EDIT]: () => editNote(response),
      [ActionMode.DELETE]: () => deleteNote(response),
    };

    mapper[currentMode]();
    
  };

  //Roda a função note all
  useEffect(() => {
    noteAll();
  }, [noteEdited, noteRemoved]);

  const addNoteInList = useCallback((note) => {
    const noteAdd = [...toDoList, note];
    setNotes(noteAdd);
  }, [toDoList]);

  useEffect(() => {if (
    noteCreated &&
    !toDoList.map(({ id }) => id).includes(noteCreated.id)
  ) {
    addNoteInList(noteCreated);
  }
}, [addNoteInList, noteCreated, toDoList]);

  return (
    <div className="ToDoList">
      {toDoList.map((note, index) => (
        <ToDoListItem
        currentMode={currentMode}
          key={`toDoListItem-${index}`}
          note={note}
          noteSelected={noteSelected[index]}
          index={index}
          removeNote={(index) => removeNote(index)}
          addNote={(index) => addNote(index)}
          clickItem={(noteId) => noteById(noteId)}
        />
      ))}
      {noteModal && (
        <NoteDetailsModal
          note={noteModal}
          closeModal={() => setNoteModal(false)}
        />
      )}
    </div>
  );
}

export default ToDoList;
