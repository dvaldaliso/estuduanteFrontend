import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Loader } from "./components/Loader";

import AddBook from "./features/student/addStudent";

const App = () => {
  return (
    <>
      <Loader showLoading />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddBook />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;