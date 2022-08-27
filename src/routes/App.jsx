import React from 'react';
import Header from "../component/Header";
import Login from "./login";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={
            <div>
            <Header />
            <Home />
            </div>
          } />
          <Route path="/Login" element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
