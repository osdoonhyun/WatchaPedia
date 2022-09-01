import React from 'react';
import Header from '../component/Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResult from './searchResult';
import Login from './login';
import SignUp from './signUp';
import MovieDetail from './movieDetail';  
import Profile from './profile';
import ProfileEdit from './profileEdit';
import ProfileComment from './profileComment';
import ProfileEvaluation from './profileEvaluation';
import ProfileCollection from './profileCollection';

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
          <Route path='/MovieDetail' element={<MovieDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profileEdit' element={<ProfileEdit />} />
          <Route path='/ProfileEvaluation' element={<ProfileEvaluation />} />
          <Route path='/ProfileComment' element={<ProfileComment />} />
          <Route path='/ProfileCollection' element={<ProfileCollection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
