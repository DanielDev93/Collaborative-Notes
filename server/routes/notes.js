// routes/notes.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const notes = new Map(); // In-memory store

// Initialize with default notes
notes.set("1", {
  id: "1",
  title: "Welcome to Collaborative Notes",
  content: "Start editing this note in real-time!",
  updatedAt: new Date()
});

notes.set("2", {
  id: "2",
  title: "Tips",
  content: "Try opening this app in multiple tabs to test collaboration.",
  updatedAt: new Date()
});

// Get all notes
router.get('/', (req, res) => {
  res.json({ success: true, data: Array.from(notes.values()) });
});

// Get note by ID
router.get('/:id', (req, res) => {
  const note = notes.get(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json({ success: true, data: note });
});

// Create a new note
router.post('/', (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  const newId = uuidv4();
  const newNote = { id: newId, title, content, updatedAt: new Date() };
  notes.set(newId, newNote);
  res.json({ success: true, data: newNote });
});

// Update a note
router.patch('/', (req, res) => {
  const { id, title, content } = req.body;
  if (!notes.has(id)) return res.status(404).json({ error: "Note not found" });

  const updatedNote = { ...notes.get(id), title, content, updatedAt: new Date() };
  notes.set(id, updatedNote);
  res.json({ success: true, data: updatedNote });
});

// Delete a note
router.delete('/:id', (req, res) => {
  if (!notes.has(req.params.id)) return res.status(404).json({ error: "Note not found" });

  notes.delete(req.params.id);
  res.json({ success: true });
});

module.exports = router;