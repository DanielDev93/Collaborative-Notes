import { useNavigate } from "react-router-dom";
import { getNotes } from "../services/api";
import { useEffect, useState } from "react";
import { socket } from "../services/socket"; // Import socket connection

function Home() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const resp = await getNotes();
    setNotes(resp.data);
  }

  useEffect(() => {
    const handleNoteCreated = (note) => {
      setNotes((prev) => [...prev, note]);
    };

    const handleNoteUpdated = (updatedNote) => {
      setNotes((prev) =>
        prev.map((note) => note.id === updatedNote.id ? updatedNote : note)
      );
    };

    const handleNoteDeleted = ({ id }) => {
      setNotes((prev) =>
        prev.filter((note) => note.id !== id)
      );
    }

    socket.on("note-created", handleNoteCreated);
    socket.on("note-updated", handleNoteUpdated);
    socket.on("note-deleted", handleNoteDeleted);
    fetchNotes();

    return () => {
      socket.off("note-created", handleNoteCreated);
      socket.off("note-updated", handleNoteUpdated);
      socket.off("note-deleted", handleNoteDeleted);
    };
  }, []);

  const handleNewNote = () => {
    navigate(`/note/create`);
  };

  const handleDeleteNote = (id) => {
    // Emit 'note-delete' socket event
    socket.emit("note-delete", {id});
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">My Notes</h1>
        <button
          onClick={handleNewNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Note
        </button>
      </div>
      <ul className="space-y-2">
        {notes.length === 0 ? (
          <li>No notes found.</li>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              onClick={() => navigate(`/note/${note.id}`)}
              className="p-3 border rounded cursor-pointer hover:bg-gray-100 relative"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(note.id)
                }}
                className="absolute right-2 top-2 z-[100]">
              🗑️
              </button>
              <div className="font-medium">{note.title || "Untitled Note"}</div>
              <div className="text-sm text-gray-500">
                {new Date(note.updatedAt).toLocaleString()}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
