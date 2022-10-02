import React, { useState, useEffect } from "react";
import ToDoListItem from "components/ToDoListItem/ToDoListItem";
import { NoteService } from "services/NoteService";
import NoteDetailsModal from "components/NoteDetailsModal/NoteDetailsModal";
import "./ToDoList.css";

function ToDoList({ noteCreated }) {
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
    setNoteModal(response);
  };

  //Roda a função note all
  useEffect(() => {
    noteAll();
  }, []);

  const addNoteInList = (note) => {
    const noteAdd = [...toDoList, note];
    setNotes(noteAdd);
  };

  useEffect(() => {
    if (noteCreated) addNoteInList(noteCreated);
  }, [noteCreated]);

  return (
    <div className="ToDoList">
      {toDoList.map((note, index) => (
        <ToDoListItem
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
