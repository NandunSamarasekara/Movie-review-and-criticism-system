import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, getReviews, addReview } from '../api/api';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewForm, setReviewForm] = useState({ comment: '', rating: '' });

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await getMovieById(id);
            setMovie(movieData);
        };
        const fetchReviews = async () => {
            const reviewData = await getReviews();
            setReviews(reviewData.filter((review) => review.movie.id === parseInt(id)));
        };
        fetchMovie();
        fetchReviews();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReview({
                movie: { id: parseInt(id) },
                user: { id: parseInt(localStorage.getItem('userId')) },
                comment: reviewForm.comment,
                rating: parseFloat(reviewForm.rating)
            });
            alert('Review added successfully');
            setReviewForm({ comment: '', rating: '' });
            const reviewData = await getReviews();
            setReviews(reviewData.filter((review) => review.movie.id === parseInt(id)));
        } catch (error) {
            alert('Something went wrong');
        }
    };

    if (!movie) return (
        <div className="movie-app">
            <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading movie...</p>
            </div>
        </div>
    );

    return (
        <div className="movie-app">
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">{movie.title}</h1>
                </div>
            </header>
            <main className="container">
                {/* Movie Details Card */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
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
                        <h3>{movie.title}</h3>
                        <div className="movie-meta">
                            <span><i className="icon">🎬</i> {movie.director}</span>
                            <span><i className="icon">📅</i> {movie.year}</span>
                        </div>
                    </div>
                </div>

                {/* Reviews Card */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h3>Reviews</h3>
                        {reviews.length === 0 ? (
                            <p className="text-muted">No reviews yet. Be the first to review!</p>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="mb-3 pb-3 border-bottom">
                                    <div className="d-flex justify-content-between">
                                        <h5>{review.user.firstName} {review.user.lastName}</h5>
                                        <span className="badge bg-primary">Rating: {review.rating}/10</span>
                                    </div>
                                    <p className="mb-0">{review.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Add Review Card */}
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h3>Add Your Review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Comment</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={reviewForm.comment}
                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Rating (0-10)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={reviewForm.rating}
                                    onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit Review</button>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="app-footer">
                <div className="container">
                    <p>© {new Date().getFullYear()} Movie Explorer. All rights reserved.</p>
                </div>
            </footer>

            {/* CSS Styles */}
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

                .card {
                    border: none;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background: white;
                }

                .card-body {
                    padding: 1.5rem;
                }

                .poster-container {
                    width: 100%;
                    height: 300px;
                    background: #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-bottom: 1rem;
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
                    font-size: 4rem;
                    color: #ff2323;
                    font-weight: bold;
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

                .loading-state {
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

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                .app-footer {
                    background: #343a40;
                    color: white;
                    padding: 2rem 0;
                    text-align: center;
                    margin-top: 3rem;
                }

                @media (max-width: 768px) {
                    .app-title {
                        font-size: 2rem;
                    }

                    .poster-container {
                        height: 200px;
                    }
                }
            `}</style>
        </div>
    );
};

export default MovieDetail;