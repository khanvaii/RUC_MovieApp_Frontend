// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import '../CSS/MovieDetail.css';
// import { UserContext } from '../App';

// const MovieDetail = () => {
//   const { tconst } = useParams();
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [bookmarked, setBookmarked] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [posterPath, setPosterPath] = useState(null);
//   const { userId } = useContext(UserContext);

//   const TMDB_API_KEY = '9ad9b152ca62395552190ab6ae0fd342';

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         setLoading(true);

//         const response = await fetch(`https://localhost:7019/api/movie/${tconst}`);
//         if (!response.ok) throw new Error('Failed to fetch movie details');

//         const movie = await response.json();

//         const tmdbResponse = await fetch(
//           `https://api.themoviedb.org/3/find/${tconst}?external_source=imdb_id&api_key=${TMDB_API_KEY}`
//         );
//         const tmdbData = await tmdbResponse.json();
//         const posterPath = tmdbData.tv_results?.[0]?.poster_path || null;

//         setMovieDetails(movie);
//         setPosterPath(posterPath);

//         // Fetch user-specific data like bookmark, rating, and comments
//         // Replace with your API endpoints
//         // const userResponse = await fetch(`https://localhost:7019/api/movie/userdata/${tconst}`);
//         // const userData = await userResponse.json();
//         // setBookmarked(userData.bookmarked);
//         // setRating(userData.rating);
//         // setComments(userData.comments);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [tconst]);

//   const handleBookmark = async () => {
//     try {
//       const response = await fetch(`https://localhost:7019/api/bookmark?userId=${userId}&movieId=${tconst}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bookmarked: !bookmarked }),
//       });
//       if (response.ok) {
//         setBookmarked(!bookmarked);
//       } else {
//         throw new Error('Failed to update bookmark');
//       }
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleRating = async (newRating) => {
//     try {
//       await fetch(`https://localhost:7019/api/rating/rate?userId=${userId}&movieId=${tconst}&rating=${newRating}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ tconst, rating: newRating }),
//       });
//       setRating(newRating);
//     } catch (err) {
//       alert('Failed to submit rating');
//     }
//   };

//   const handleCommentSubmit = async () => {
//     try {
//       await fetch(`https://localhost:7019/api/movie/comment`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ tconst, comments }),
//       });
//       alert('Comment saved!');
//     } catch (err) {
//       alert('Failed to save comment');
//     }
//   };

//   if (loading) return <div className="loading">Loading movie details...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   const {
//     primarytitle,
//     originaltitle,
//     startyear,
//     genres,
//     runtimeminutes,
//     titletype,
//   } = movieDetails;

//   return (
//     <div className="movie-detail-container">
//       {posterPath ? (
//         <img
//           src={`https://image.tmdb.org/t/p/w300${posterPath}`}
//           alt={primarytitle}
//           className="movie-poster"
//         />
//       ) : (
//         <div className="placeholder-poster">No Image Available</div>
//       )}

//       <div className="movie-info">
//         <p>
//           <strong>Title:</strong> {primarytitle}
//         </p>
//         <p>
//           <strong>Original Title:</strong> {originaltitle}
//         </p>
//         <p>
//           <strong>Type:</strong> {titletype}
//         </p>
//         <p>
//           <strong>Start Year:</strong> {startyear}
//         </p>
//         <p>
//           <strong>Genres:</strong> {genres || 'N/A'}
//         </p>
//         <p>
//           <strong>Runtime:</strong> {runtimeminutes ? `${runtimeminutes} minutes` : 'N/A'}
//         </p>
//       </div>

//       <div className="movie-actions">
//         <button onClick={handleBookmark}>
//           {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
//         </button>

//         <div className="rating-section">
//           <p>Rate this movie:</p>
//           {[1, 2, 3, 4, 5].map((num) => (
//             <button
//               key={num}
//               className={`rating-button ${num <= rating ? 'selected' : ''}`}
//               onClick={() => handleRating(num)}
//             >
//               {num}⭐
//             </button>
//           ))}
//         </div>

//         <div className="comments-section">
//           <textarea
//             placeholder="Add your comments here..."
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           />
//           <button onClick={handleCommentSubmit}>Save Comment</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetail;
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import '../CSS/MovieDetail.css';

const MovieDetail = () => {
  const { tconst } = useParams();
  const { userId } = useContext(UserContext) // Access logged-in user details

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [posterPath, setPosterPath] = useState(null);

  const TMDB_API_KEY = '9ad9b152ca62395552190ab6ae0fd342';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://localhost:7019/api/movie/${tconst}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');

        const movie = await response.json();

        const tmdbResponse = await fetch(
          `https://api.themoviedb.org/3/find/${tconst}?external_source=imdb_id&api_key=${TMDB_API_KEY}`
        );
        const tmdbData = await tmdbResponse.json();
        const posterPath = tmdbData.tv_results?.[0]?.poster_path || null;

        setMovieDetails(movie);
        setPosterPath(posterPath);

        // Fetch user-specific data
        const userResponse = await fetch(
          `https://localhost:7019/api/movie/userdata?userId=${userId}&movieId=${tconst}`
        );
        const userData = await userResponse.json();
        setBookmarked(userData.bookmarked);
        setRating(userData.rating);
        setComments(userData.notes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [tconst, userId]);

  const handleBookmark = async () => {
    try {
      await fetch(
        `https://localhost:7019/api/bookmark?userId=${userId}&movieId=${tconst}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookmarked: !bookmarked }),
        }
      );
      setBookmarked(!bookmarked);
    } catch (err) {
      alert('Failed to update bookmark');
    }
  };

  const handleRating = async (newRating) => {
    try {
      await fetch(
        `https://localhost:7019/api/rating/rate?userId=${userId}&movieId=${tconst}&rating=${newRating}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setRating(newRating);
    } catch (err) {
      alert('Failed to submit rating');
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await fetch(
        `https://localhost:7019/api/Notes?Userid=${userId}&MovieId=${tconst}&Notes=${encodeURIComponent(
          comments
        )}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      alert('Note saved successfully!');
    } catch (err) {
      alert('Failed to save note: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const {
    primarytitle,
    originaltitle,
    startyear,
    genres,
    runtimeminutes,
    titletype,
  } = movieDetails;

  return (
    <div className="movie-detail-container">
      {posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${posterPath}`}
          alt={primarytitle}
          className="movie-poster"
        />
      ) : (
        <div className="placeholder-poster">No Image Available</div>
      )}

      <div className="movie-info">
        <p>
          <strong>Title:</strong> {primarytitle}
        </p>
        <p>
          <strong>Original Title:</strong> {originaltitle}
        </p>
        <p>
          <strong>Type:</strong> {titletype}
        </p>
        <p>
          <strong>Start Year:</strong> {startyear}
        </p>
        <p>
          <strong>Genres:</strong> {genres || 'N/A'}
        </p>
        <p>
          <strong>Runtime:</strong> {runtimeminutes ? `${runtimeminutes} minutes` : 'N/A'}
        </p>
      </div>

      <div className="movie-actions">
        <button onClick={handleBookmark}>
          {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
        </button>

        <div className="rating-section">
          <p>Rate this movie:</p>
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`rating-button ${num <= rating ? 'selected' : ''}`}
              onClick={() => handleRating(num)}
            >
              {num}⭐
            </button>
          ))}
        </div>

        <div className="comments-section">
          <textarea
            placeholder="Add your comments here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Save Comment</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
