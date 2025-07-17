import React, { useState, useEffect } from 'react';
import { getMovies, searchMovies } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const data = await getMovies();
                setMovies(data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await searchMovies(search);
            setMovies(data);
        } catch (error) {
            console.error("Error searching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeeMore = () => {
        navigate('/all-movies');
    };

    // Sort movies for sections
    const latestMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 4); // Latest 4 movies by year
    const trendingMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 4); // Random 4 for trending
    const highestRatedMovies = [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4); // Highest rated 4

    return (
        <div className="movie-app">
            {/* Hero Section */}
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">Movie Explorer</h1>
                    <p className="app-subtitle">Discover your next favorite film</p>

                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search for movies by title, director, or year..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    <i className="search-icon">🔍</i>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </header>

            {/* Main Content */}
            <main className="container">
                {loading && movies.length === 0 ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading movies...</p>
                    </div>
                ) : movies.length === 0 ? (
                    <div className="empty-state">
                        <h3>No movies found</h3>
                        <p>Try a different search term</p>
                    </div>
                ) : (
                    <>
                        {/* Latest Movies Section */}
                        <section className="movie-section">
                            <h2 className="section-title">Latest Movies</h2>
                            <div className="movie-grid">
                                {latestMovies.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        <div className="card-inner">
                                            <div className="card-front">
                                                <div className="poster-container">
                                                    {movie.posterUrl ? (
                                                        <img
                                                            src={movie.posterUrl}
                                                            alt={`${movie.title} poster`}
                                                            className="movie-poster"
                                                        />
                                                    ) : (
                                                        <div className="poster-placeholder">
                                                            {movie.title.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="card-content">
                                                    <h3>{movie.title}</h3>
                                                    <div className="movie-meta">
                                                        <span><i className="icon">🎬</i> {movie.director}</span>
                                                        <span><i className="icon">📅</i> {movie.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back">
                                                <div className="card-content">
                                                    <h3>{movie.title}</h3>
                                                    <div className="movie-meta">
                                                        <span><i className="icon">🎬</i> {movie.director}</span>
                                                        <span><i className="icon">📅</i> {movie.year}</span>
                                                    </div>
                                                    <Link
                                                        to={`/movies/${movie.id}`}
                                                        className="details-button"
                                                    >
                                                        View Details <i className="arrow">→</i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Trending Movies Section */}
                        <section className="movie-section">
                            <h2 className="section-title">Trending Movies</h2>
                            <div className="movie-grid">
                                {trendingMovies.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        <div className="card-inner">
                                            <div className="card-front">
                                                <div className="poster-container">
                                                    {movie.posterUrl ? (
                                                        <img
                                                            src={movie.posterUrl}
                                                            alt={`${movie.title} poster`}
                                                            className="movie-poster"
                                                        />
                                                    ) : (
                                                        <div className="poster-placeholder">
                                                            {movie.title.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="card-content">
                                                    <h3>{movie.title}</h3>
                                                    <div className="movie-meta">
                                                        <span><i className="icon">🎬</i> {movie.director}</span>
                                                        <span><i className="icon">📅</i> {movie.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back">
                                                <div className="card-content">
                                                    <h3>{movie.title}</h3>
                                                    <div className="movie-meta">
                                                        <span><i className="icon">🎬</i> {movie.director}</span>
                                                        <span><i className="icon">📅</i> {movie.year}</span>
                                                    </div>
                                                    <Link
                                                        to={`/movies/${movie.id}`}
                                                        className="details-button"
                                                    >
                                                        View Details <i className="arrow">→</i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Highest Rated Movies Section */}
                        <section className="movie-section">
                            <h2 className="section-title">Highest Rated Movies</h2>
                            <div className="movie-grid">
                                {highestRatedMovies.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        <div className="card-inner">
                                            <div className="card-front">
                                                <div className="poster-container">
                                                    {movie.posterUrl ? (
                                                        <img
                                                            src={movie.posterUrl}
                                                            alt={`${movie.title} poster`}
                                                            className="movie-poster"
                                                        />
                                                    ) : (
                                                        <div className="poster-placeholder">
                                                            {movie.title.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="card-content">
                                                    <h3>{movie.title}</h3>
                                                    <div className="movie-meta">
                                                        <span><i className="icon">🎬</i> {movie.director}</span>
                                                        <span><i className="icon">📅</i> {movie.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back">
                                                <div className="card-content">
                                                    <h3>{movie.title}</h3>
                                                    <div className="movie-meta">
                                                        <span><i className="icon">🎬</i> {movie.director}</span>
                                                        <span><i className="icon">📅</i> {movie.year}</span>
                                                    </div>
                                                    <Link
                                                        to={`/movies/${movie.id}`}
                                                        className="details-button"
                                                    >
                                                        View Details <i className="arrow">→</i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* See More Card */}
                        <div className="movie-grid">
                            <div className="movie-card">
                                <div className="card-inner" style={{ background: 'linear-gradient(135deg, #fc2525 0%, #000000 100%)', color: 'white' }}>
                                    <div className="card-front" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <button
                                            onClick={handleSeeMore}
                                            className="details-button"
                                            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', width: '100%', height: '100%' }}
                                        >
                                            See More <i className="arrow">→</i>
                                        </button>
                                    </div>
                                    <div className="card-back" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <button
                                            onClick={handleSeeMore}
                                            className="details-button"
                                            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', width: '100%', height: '100%' }}
                                        >
                                            See More <i className="arrow">→</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <div className="container">
                    <p>© {new Date().getFullYear()} Movie Explorer. All rights reserved.</p>
                </div>
            </footer>

            {/* CSS Styles (Updated for 4 cards per row) */}
            <style jsx>{`
                .movie-app {
                    min-height: 100vh;
                    background-color: rgba(90, 90, 90, 0.92);
                    color: #333;
                }

                .app-header {
                    background: linear-gradient(135deg, #ff2323 0%, #000000 100%);
                    color: white;
                    padding: 3rem 0;
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .app-title {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .app-subtitle {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                }

                .search-form {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .search-container {
                    position: relative;
                    display: flex;
                }

                .search-container input {
                    flex: 1;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 30px;
                    font-size: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .search-container button {
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    background: #ffffff;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .search-container button:disabled {
                    background: #6a11cb;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                .movie-section {
                    margin-bottom: 3rem;
                }

                .section-title {
                    font-size: 2rem;
                    color: white;
                    margin-bottom: 1rem;
                }

                .movie-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr); /* 4 cards per row */
                    gap: 2rem;
                    padding: 1rem 0;
                }

                .movie-card {
                    perspective: 1000px;
                    height: 400px;
                }

                .card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                }

                .movie-card:hover .card-inner {
                    transform: rotateY(180deg);
                }

                .card-front,
                .card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background: white;
                }

                .card-back {
                    background: linear-gradient(135deg, #fc2525 0%, #000000 100%);
                    color: white;
                    transform: rotateY(180deg);
                    display: flex;
                    align-items: center;
                }

                .poster-container {
                    height: 70%;
                    background: #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .movie-poster {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .poster-placeholder {
                    height: 100%;
                    background: #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 4rem;
                    color: #ff2323;
                    font-weight: bold;
                }

                .card-content {
                    padding: 1.5rem;
                }

                .card-content h3 {
                    margin-bottom: 1rem;
                    font-size: 1.3rem;
                }

                .movie-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                }

                .movie-meta .icon {
                    margin-right: 5px;
                }

                .details-button {
                    display: inline-block;
                    padding: 8px 20px;
                    background: white;
                    color: #000000;
                    border-radius: 30px;
                    text-decoration: none;
                    font-weight: bold;
                    transition: all 0.3s;
                }

                .details-button:hover {
                    background: #f8f9fa;
                    transform: translateX(5px);
                }

                .details-button .arrow {
                    transition: all 0.3s;
                }

                .details-button:hover .arrow {
                    transform: translateX(3px);
                }

                .loading-state,
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 0;
                    text-align: center;
                }

                .loading-state .spinner {
                    border-top-color: #6a11cb;
                    border-left-color: #6a11cb;
                    margin-bottom: 1rem;
                }

                .empty-state h3 {
                    color: #6a11cb;
                    margin-bottom: 0.5rem;
                }

                .app-footer {
                    background: #343a40;
                    color: white;
                    padding: 2rem 0;
                    text-align: center;
                    margin-top: 3rem;
                }

                @media (max-width: 1200px) {
                    .movie-grid {
                        grid-template-columns: repeat(2, 1fr); /* 2 cards per row on medium screens */
                    }
                }

                @media (max-width: 768px) {
                    .movie-grid {
                        grid-template-columns: repeat(1, 1fr); /* 1 card per row on small screens */
                    }

                    .app-title {
                        font-size: 2rem;
                    }

                    .app-subtitle {
                        font-size: 1rem;
                    }

                    .section-title {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default HomePage;