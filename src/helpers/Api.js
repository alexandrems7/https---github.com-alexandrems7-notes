const NoteContext = {
  noteEndpoint: () => `${Api.baseUrl}/notes`,
  noteAll: () => `${NoteContext.noteEndpoint()}/all`,
  noteById: (id) => `${NoteContext.noteEndpoint()}/${id}`,
  createNote: () => `${NoteContext.noteEndpoint()}/create`,
  updateNote: (id) => `${NoteContext.noteEndpoint()}/update/${id}`,  
  deleteNote: (id) => `${NoteContext.noteEndpoint()}/delete/${id}`,
};

export const Api = {
  baseUrl: "https://api-blue-note.herokuapp.com",
  ...NoteContext,
};
