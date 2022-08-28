import React from 'react';
import Header from '../component/Header';
import Login from './login';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResult from './searchResult';
import SignUp from './signUp';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SearchResult' element={<SearchResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
