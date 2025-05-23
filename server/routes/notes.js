// routes/notes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/noteController');

router.get('/', (req, res) => {
  const { start = 0, end = 10 } = req.query;
  const notes = ctrl.getNotes(start, end);
  res.json({ success: true, data: notes });
});

router.get('/:id', (req, res) => {
  const note = ctrl.getNote(req.params.id);
  if (!note) return res.status(404).json({ error: "Not found" });
  res.json({ success: true, data: note });
});

module.exports = router;