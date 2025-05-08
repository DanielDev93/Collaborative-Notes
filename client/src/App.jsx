import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteEditor from "./pages/NoteEditor";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note/:noteId" element={<NoteEditor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
