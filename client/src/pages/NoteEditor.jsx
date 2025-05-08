import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById } from "../services/api";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { socket } from "../services/socket"; // Import socket connection

function NoteEditor() {
  const { noteId } = useParams(); // 'create' means new note, otherwise it's an existing note ID
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNoteById = async(id) => {
    const resp = await getNoteById(id);
    if (resp.data) {
      setTitle(resp.data.title);
      setContent(resp.data.content);
    }
  }

  useEffect(() => {
    if (noteId !== "create") {
      fetchNoteById(noteId);
    }
  },[noteId]);

  const save = async () => {
    // Emit 'note-update' socket event
    socket.emit('note-update', { id: noteId, title, content });
    navigate("/");
  }

  const add = () => {
    // Emit 'note-create' socket event
    socket.emit('note-create', { title, content });
    navigate("/");
  }

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="text-xl w-full p-2 border"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill theme="snow" value={content} onChange={(e) => setContent(e)} className="border" />
      <div className="flex justify-center gap-3">
        {noteId === "create" ? 
          <button
            onClick={add}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded"
          >
            Add
          </button> : 
          <button
            onClick={save}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        }
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
