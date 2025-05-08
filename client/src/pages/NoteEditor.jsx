import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById } from "../services/api";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { socket } from "../services/socket";

function NoteEditor() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEmitAllowed, setIsEmitAllowed] = useState(false); // Whether the user is currently allowed to emit socket updates
  const [remoteEditing, setRemoteEditing] = useState({ title: false, content: false }); 
  const isFirstLoad = useRef(true); // track last emitted content
  const emitTimeout = useRef(null);

  const fetchNoteById = async (id) => {
    const resp = await getNoteById(id);
    if (resp.data) {
      setTitle(resp.data.title);
      setContent(resp.data.content);
    }
  };

  useEffect(() => {
    if (noteId !== "create") {
      fetchNoteById(noteId);
    }

    // Listen for live edits
    socket.on("note-editing", (data) => {
      if (data.id === noteId) {
        setRemoteEditing({ title: false, content: false });
        setTitle(data.title);
        setContent(data.content);
      }
    });

    // Update editing status
    socket.on("editing-status", (data) => {
      if (data.id === noteId) setRemoteEditing((prev) => ({ ...prev, [data.field]: true }));
    })

    return () => {
      socket.off("note-editing");
      socket.off("editing-status");
    };
  }, [noteId]);

  // Throttle sending edits
  useEffect(() => {
    if (noteId === "create") return;
    if (isEmitAllowed) {
      socket.emit("note-editing", { id: noteId, title, content });
    } 
  }, [title, content, isEmitAllowed]);

  const handleTitleChange = (val) => {
    setIsEmitAllowed(false);
    socket.emit("editing-status", { id: noteId, field: "title" }); // to show other users if someone is editing the content
    setTitle(val);
    if (emitTimeout.current) {
      clearTimeout(emitTimeout.current);
    }
    emitTimeout.current = setTimeout(() => {
      setIsEmitAllowed(true);
    }, 1000);
  };

  const handleContentChange = (val) => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setIsEmitAllowed(false);
    socket.emit("editing-status", { id: noteId, field: "content" }); // to show other users if someone is editing the content
    setContent(val);
    if (emitTimeout.current) {
      clearTimeout(emitTimeout.current);
    }
    emitTimeout.current = setTimeout(() => {
      setIsEmitAllowed(true);
    }, 1000);
  };

  const save = () => {
    socket.emit("note-update", { id: noteId, title, content });
    navigate("/");
  };

  const add = () => {
    socket.emit("note-create", { title, content });
    navigate("/");
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="text-xl w-full p-2 border"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
      />
      {remoteEditing.title && (
        <div className="text-sm text-left">The title is being edited...</div>
      )}
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        className="border"
      />
      {remoteEditing.content && (
        <div className="text-sm text-left">The content is being edited...</div>
      )}
      <div className="flex justify-center gap-3">
        {noteId === "create" ? (
          <button
            onClick={add}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        ) : (
          <button
            onClick={save}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 bg-gray-300 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;