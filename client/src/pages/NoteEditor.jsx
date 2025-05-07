import { useParams } from "react-router-dom";

function NoteEditor() {
  const { id } = useParams();
  return (
    <div className="p-4 space-y-4">
      Note Editor page
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-5 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}

export default NoteEditor;
