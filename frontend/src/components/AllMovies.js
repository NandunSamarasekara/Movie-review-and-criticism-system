import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies, searchMovies } from '../api/api';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
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

    if (loading) {
        return (
            <div className="movie-app">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading movies...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="movie-app">
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">All Movies</h1>
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
            <main className="container">
                {movies.length === 0 ? (
                    <div className="empty-state">
                        <h3>No movies found</h3>
                    </div>
                ) : (
                    <div className="movie-grid">
                        {movies.map((movie) => (
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
                )}
            </main>
            <footer className="app-footer">
                <div className="container">
                    <p>© {new Date().getFullYear()} Movie Explorer. All rights reserved.</p>
                </div>
            </footer>

            {/* CSS Styles (Updated for Horizontal Rectangles) */}
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
                    margin-bottom: 1rem;
                }

                .search-form {
                    max-width: 800px;
                    margin: 1rem auto 2rem;
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

                .movie-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr)); /* Horizontal rectangles */
                    gap: 2rem;
                    padding: 1rem 0;
                }

                .movie-card {
                    perspective: 1000px;
                    height: 200px; /* Reduced height for horizontal layout */
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
                    display: flex;
                    flex-direction: row; /* Horizontal layout */
                    align-items: center;
                }

                .card-back {
                    background: linear-gradient(135deg, #fc2525 0%, #000000 100%);
                    color: white;
                    transform: rotateY(180deg);
                }

                .poster-container {
                    width: 40%; /* Adjusted for horizontal layout */
                    height: 100%;
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
                    width: 100%;
                    height: 100%;
                    background: #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem; /* Reduced for horizontal */
                    color: #ff2323;
                    font-weight: bold;
                }

                .card-content {
                    padding: 1rem;
                    width: 60%; /* Adjusted for horizontal layout */
                }

                .card-content h3 {
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                }

                .movie-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    margin-bottom: 1rem;
                    font-size: 0.8rem;
                }

                .movie-meta .icon {
                    margin-right: 5px;
                }

                .details-button {
                    display: inline-block;
                    padding: 6px 15px;
                    background: white;
                    color: #000000;
                    border-radius: 20px;
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
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: #6a11cb;
                    border-left-color: #6a11cb;
                    animation: spin 1s ease-in-out infinite;
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

                @media (max-width: 768px) {
                    .movie-grid {
                        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* Adjusted for mobile */
                    }

                    .app-title {
                        font-size: 2rem;
                    }

                    .movie-card {
                        height: 150px; /* Reduced for mobile */
                    }

                    .poster-container {
                        width: 30%; /* Adjusted for mobile */
                    }

                    .card-content {
                        width: 70%; /* Adjusted for mobile */
                    }
                }
            `}</style>
        </div>
    );
};

export default AllMovies;