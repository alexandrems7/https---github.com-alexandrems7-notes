import { useState } from "react";
import Navbar from "components/Navbar/Navbar";
import ToDoList from "components/ToDoList/ToDoList";
import AddNoteModal from "components/AddNoteModal/AddNoteModal";
import "./Home.css";

function Home() {
  
  const [canShowAddNoteModal, setCanShowAddNoteModal] = useState(false);


const [noteForAdd, setNoteForAdd] = useState();

  
  
  
  return (
    <div className="Home">
      <Navbar createNote={() => setCanShowAddNoteModal(true)} />
      <div className="Home__container">
        <ToDoList noteCreated={noteForAdd} />
        {canShowAddNoteModal && (
          <AddNoteModal closeModal={() => setCanShowAddNoteModal(false)} onCreateNote={(note) => setNoteForAdd(note)}/>
        )}
      </div>
    </div>
  );
}

export default Home;
