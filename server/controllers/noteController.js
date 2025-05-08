// controllers/noteController.js
const store = require('../models/noteStore');

exports.getNotes = () => store.getAll();
exports.getNote = (id) => store.get(id);
exports.createNote = (data) => store.create(data);
exports.editNote = (data) => store.update(data);
exports.deleteNote = (id) => store.remove(id);