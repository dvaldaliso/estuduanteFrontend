import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Loader } from "./components/Loader";

import AddStudent from "./features/student/addStudent";
import ListUser from "./features/user/listUser";

const App = () => {
  return (
    <>
      <Loader showLoading />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListUser />} />
          <Route path="/student" element={<AddStudent />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;