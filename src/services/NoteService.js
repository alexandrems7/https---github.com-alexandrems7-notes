import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();

const transformNote = (note) => {
  return {
    ...note,
    id: note._id,
    name: note.name,
    duration: note.duration,
    completed: note.completed,
    levelOfImportance: note.levelOfImportance,
  };
};

const parseTransformNote = (response) =>
  parseResponse(response).then((notes) => notes.map(transformNote));

const parseTransformOneNote = (response) =>
  parseResponse(response).then(transformNote);

export const NoteService = {
  getAll: () =>
    fetch(Api.noteAll(), { method: "GET" }).then(parseTransformNote),
  getById: (id) =>
    fetch(Api.noteById(id), { method: "GET" }).then(parseTransformOneNote),
  create: (note) =>
    fetch(Api.createNote(), { method: "POST", body: JSON.stringify(note), mode: "cors", headers: {
      "Content-Type": "application/json",
  } }).then(parseTransformOneNote),
  updateById: (id, note) =>
    fetch(Api.updateNote(id), { method: "PUT", body: JSON.stringify(note), mode: "cors", headers: {
      "Content-Type": "application/json",
      } }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deleteNote(id), { method: "DELETE" }).then(parseResponse),
};

