import "./ToDoListItem.css";
import { ActionMode } from "constants/index";
function ToDoListItem({
  note,
  noteSelected,
  index,
  clickItem,
  currentMode,
  
}) {
  const badgeCounter = (canRender) =>
    Boolean(canRender) && (
      <span className="ToDoListItem__badge"> {noteSelected} </span>
    );

  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`ToDoListItem__tag ${
            currentMode === ActionMode.DELETE && "ToDoListItem__tag--delete"
          }`}
        >
          {currentMode}
        </span>
      );
  };

  return (
    <div
      className={`ToDoListItem ${
        currentMode !== ActionMode.NORMAL && "ToDoListItem--disable"
      }
    ${currentMode === ActionMode.DELETE && "ToDoListItem--delete"}
    `}
      onClick={() => clickItem(note.id)}
    >
      {badgeCounter(noteSelected, index)}
      {badgeAction(currentMode !== ActionMode.NORMAL)}
      <div>
        <div className="ToDoListItem__name">{note.name}</div>
        <div className="ToDoListItem__duration">Duração: {note.duration}</div>
        <div className="ToDoListItem__completed">
          Terminou?: {note.completed}
        </div>
        <div className="ToDoListItem__levelOfImportance">
          Nível de importância: {note.levelOfImportance}
        </div>
        <div className="ToDoListItem__acoes Acoes"></div>
      </div>
    </div>
  );
}

export default ToDoListItem;
