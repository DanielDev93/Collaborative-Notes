// socket/index.js
const ctrl = require('./controllers/noteController');

function initSocket(server) {
  const { Server } = require('socket.io');
  const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

  io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    socket.on("note-create", (data) => {
      const note = ctrl.createNote(data);
      io.emit("note-created", note);
    });

    socket.on("note-update", (data) => {
      const note = ctrl.editNote(data);
      if (note) io.emit("note-updated", note);
    });

    socket.on("note-delete", ({ id }) => {
      const ok = ctrl.deleteNote(id);
      if (ok) io.emit("note-deleted", { id });
    });
  });

  return io;
}

module.exports = initSocket;