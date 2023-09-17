import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import NotFound from "./components/NotFound";
import NotesList from "./components/NotesList";
import GroupsList from "./components/GroupsList";
import StudentList from "./components/StudentList";
import CurrentStudentFirstPage from "./components/CurrentStudentFirstPage";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage/>}></Route>
        <Route path="/myPage/:id" element={<CurrentStudentFirstPage />}></Route>
        <Route path="/students/:id/notes" element={<NotesList/>}></Route>
        <Route path="/students/:id/groups" element={<GroupsList/>}></Route>
        <Route path="/students/:studentId/groups/:id/students" element={<StudentList/>}></Route> 
        {/*ruta prin care afisez studentii dintr-un grup din care face parte studentul logat in aplicatie */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
