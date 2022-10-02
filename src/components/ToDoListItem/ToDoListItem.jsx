import "./ToDoListItem.css";

function ToDoListItem({
  note,
  noteSelected,
  index,
  removeNote,
  addNote,
  clickItem,
}) {
  const badgeCounter = (canRender) =>
    Boolean(canRender) && (
      <span className="ToDoListItem__badge"> {noteSelected} </span>
    );


// Funcionalidade em fase de incrementação 👇🏿👇🏿👇🏿👇🏿


  // const removeButton = (canRender, index) =>
  //   Boolean(canRender) && (
  //     <button
  //       class="Acoes__remover"
  //       onClick={(e) => {
  //         e.stopPropagation();
  //         removeNote(index);
  //       }}
  //     >
  //       remover
  //     </button>
  //   );

  return (
    <div className="ToDoListItem" onClick={()=> clickItem(note.id)}>
      {badgeCounter(noteSelected, index)}
      <div>
        <div className="ToDoListItem__name">{note.name}</div>
        <div className="ToDoListItem__duration">Duração: {note.duration}</div>
        <div className="ToDoListItem__completed">
          Terminou?: {note.completed}
        </div>
        <div className="ToDoListItem__levelOfImportance">
          Nível de importância: {note.levelOfImportance}
        </div>
        <div className="ToDoListItem__acoes Acoes">
     
     {/* Funcionalidade em fase de incrementação 👇🏿👇🏿👇🏿👇🏿 */}

          {/* <button
            className={`Acoes__adicionar ${
              !noteSelected && "Acoes__adicionar--preencher"
            }`}
            onClick={(e) => {e.stopPropagation(); addNote(index);}}
          >
            adicionar
          </button>
          {removeButton(noteSelected, index)} */}
          
        </div>
      </div>
    </div>
  );
}

export default ToDoListItem;
