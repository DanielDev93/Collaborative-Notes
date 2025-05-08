import { FixedSizeList as List } from 'react-window';
import { useNavigate } from "react-router-dom";
import { getNotes } from "../services/api";
import { useEffect, useState, useCallback } from "react";
import { socket } from "../services/socket";

function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchNotePossible, setIsFetchNotePossible] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = useCallback(async (start = 0, end = 10) => {
    setIsLoading(true);
    const resp = await getNotes(start, end);

    if (resp.data.length) {
      const newNotes = resp.data.filter((note) => !notes.some((n) => n.id === note.id));
      setIsFetchNotePossible(true);
      setNotes((prev) => [...prev, ...newNotes]);
      setIsLoading(false);
    }
    else {
      setIsLoading(false);
      setIsFetchNotePossible(false);
    } 
  }, [notes]);

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
    socket.emit("note-delete", { id });
  };

  const handleScroll = ({ scrollOffset }) => {
    // Check if the user has scrolled to the bottom of the list
    if ( notes.length && scrollOffset + 700 >= notes.length * 80 && !isLoading && isFetchNotePossible) { // 700 is the height of the list
      fetchNotes(notes.length, notes.length + 3); // Fetch more notes
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">My Notes ({notes.length})</h1>
        <button
          onClick={handleNewNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Note
        </button>
      </div>
      <hr className="mb-4 text-[#aaa]" />
      <List
        height={700}
        itemCount={notes.length}
        itemSize={80}
        width="100%"
        onScroll={handleScroll}
      >
        {({ index, style }) => (
          <div
            style={style}
            key={notes[index].id}
            onClick={() => navigate(`/note/${notes[index].id}`)}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100 relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote(notes[index].id);
              }}
              className="absolute right-2 top-2 z-[100]"
            >
              🗑️
            </button>
            <div className="font-medium">{notes[index].title || "Untitled Note"}</div>
            <div className="text-sm text-gray-500">
              {new Date(notes[index].updatedAt).toLocaleString()}
            </div>
          </div>
        )}
      </List>
      {isLoading && 
        <div className="mt-2 text-2xl">
          Loading...
        </div>
      }
    </div>
  );
}

export default Home;