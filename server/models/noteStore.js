// models/noteStore.js
const { v4: uuidv4 } = require('uuid');
const notes = new Map();

notes.set("1", { id: "1", title: "Welcome", content: "<p>Welcome to the Collaborative Notes App!</p>", updatedAt: new Date() });

module.exports = {
  getAll: () => Array.from(notes.values()),
  get: (id) => notes.get(id),
  create: ({ title, content }) => {
    const id = uuidv4();
    const note = { id, title, content, updatedAt: new Date() };
    notes.set(id, note);
    return note;
  },
  update: ({ id, title, content }) => {
    const existing = notes.get(id);
    if (!existing) return null;
    const updated = { ...existing, title, content, updatedAt: new Date() };
    notes.set(id, updated);
    return updated;
  },
  remove: (id) => notes.delete(id),
};