// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavigationBar from './components/Navbar';
//  import MoviesList from './components/GenrebasedMovies';
//  import HomePage from './components/Home';
//  import RecentReleased from './components/RecentReleased';
//  import MovieDetail from './components/MovieDetail';
// // import Recommended from './components/Recommended';
// // import UserProfile from './components/UserProfile';


// const App = () => {
//     return (
//         <Router>
//             <NavigationBar />
//             <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/movies/:genreName" element={<MoviesList />} />
//             <Route path="/recentreleased" element={<RecentReleased />} />
//             <Route path="/movie/:tconst" element={<MovieDetail />} />
               
               
               
              
//             </Routes>
//         </Router>
//     );
// };

// export default App;


import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import MoviesList from './components/GenrebasedMovies';
import HomePage from './components/Home';
import RecentReleased from './components/RecentReleased';
import MovieDetail from './components/MovieDetail';
// import Recommended from './components/Recommended';
// import UserProfile from './components/UserProfile';

// Create a Context to store the userId
export const UserContext = createContext();

const App = () => {
    const [userId, setUserId] = useState(null); // State to store logged-in userId

    // Mock login functionality for testing
    const mockLogin = () => {
        const dummyUserId = '123'; // Replace this with actual login logic
        setUserId(dummyUserId);
        localStorage.setItem('userId', dummyUserId); // Persist userId for page refresh
    };

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies/:genreName" element={<MoviesList />} />
                    <Route path="/recentreleased" element={<RecentReleased />} />
                    <Route path="/movie/:tconst" element={<MovieDetail />} />
                </Routes>
                {/* Add a button to simulate login */}
                {!userId && (
                    <button onClick={mockLogin} style={{ position: 'fixed', bottom: 20, right: 20 }}>
                        Mock Login
                    </button>
                )}
            </Router>
        </UserContext.Provider>
    );
};

export default App;
