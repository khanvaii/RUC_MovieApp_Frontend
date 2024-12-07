// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const NavigationBar = () => {
//     const [genres, setGenres] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchGenres = async () => {
//             try {
//                 const response = await fetch('https://localhost:7019/api/movie/genre');
//                 const data = await response.json();
//                 setGenres(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching genres:', error);
//             }
//         };

//         fetchGenres();
//     }, []);

//     if (loading) return <p>Loading genres...</p>;

//     const handleGenreSelect = (genreName) => {
//         // Navigate to movies list for the selected genre
//         navigate(`/movies/${genreName}`);
//     };

//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand href="/">MovieApp</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="me-auto">
//                         <DropdownButton
//                             variant="secondary"
//                             id="dropdown-basic-button"
//                             title="Genres"
//                             onSelect={handleGenreSelect}
//                         >
//                             {genres.map((genre) => (
//                                 <Dropdown.Item key={genre.genreid} eventKey={genre.genreName}>
//                                     {genre.genreName}
//                                 </Dropdown.Item>
//                             ))}
//                         </DropdownButton>
//                         <Nav.Link href="/movies">Recent Released</Nav.Link>
//                         <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>
//                         <Nav.Link href="/recommended">Recommended</Nav.Link>
//                         <Nav.Link href="/profile">User Profile</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default NavigationBar;
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://localhost:7019/api/movie/genre');
        const data = await response.json();
        setGenres(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = (genreName) => {
    setSelectedGenre(genreName);
    // Navigate to movies list for the selected genre
    navigate(`/movies/${genreName}`);
  };

  if (loading) return <p>Loading genres...</p>;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <DropdownButton
              variant="secondary"
              id="dropdown-basic-button"
              title="Genres"
              onSelect={handleGenreSelect}
            >
              {genres.map((genre) => (
                <Dropdown.Item key={genre.genreid} eventKey={genre.genreName}>
                  {genre.genreName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Nav.Link href="/movies">Recent Released</Nav.Link>
            <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>
            <Nav.Link href="/recommended">Recommended</Nav.Link>
            <Nav.Link href="/profile">User Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
