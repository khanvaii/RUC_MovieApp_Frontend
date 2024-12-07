import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
 import MoviesList from './components/GenrebasedMovies';
 import HomePage from './components/Home';
// import RecentReleases from './components/RecentReleases';
// import Bookmarks from './components/Bookmarks';
// import Recommended from './components/Recommended';
// import UserProfile from './components/UserProfile';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:genreName" element={<MoviesList />} />
               
               
               
                {/* <Route path="/movies/:genreName" element={<MoviesList />} />
                {/* <Route path="/" element={<RecentReleases />} /> */}
                {/* <Route path="/movies/:genreName" element={<MoviesList />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/recommended" element={<Recommended />} />
                <Route path="/profile" element={<UserProfile />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
