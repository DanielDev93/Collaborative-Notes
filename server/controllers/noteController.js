// controllers/noteController.js
const store = require('../models/noteStore');

exports.getNotes = (start, end) => {
  const allNotes = store.getAll();
  return allNotes.slice(start, end);
};
exports.getNote = (id) => store.get(id);
exports.createNote = (data) => store.create(data);
exports.editNote = (data) => store.update(data);
exports.deleteNote = (id) => store.remove(id);