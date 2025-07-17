import React, { useState, useEffect } from 'react';
import { getUserById, getReviews } from '../api/api';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            alert('Please log in!');
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
                alert('Error importing user details!');
            }
        };

        const fetchReviews = async () => {
            try {
                const reviewData = await getReviews();
                const userReviews = reviewData
                    .filter((review) => review.user.id === parseInt(userId))
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setReviews(userReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                alert('Error submitting reviews!');
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchUserData(), fetchReviews()]);
            setLoading(false);
        };

        fetchData();
    }, [userId, navigate]);

    if (loading) {
        return (
            <div className="movie-app">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="movie-app">
                <div className="container py-5 text-center">
                    No user details found!
                </div>
            </div>
        );
    }

    return (
        <div className="movie-app">
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">User Profile</h1>
                </div>
            </header>
            <main className="container">
                {/* User Profile Section */}
                <div className="profile-section animated">
                    <h3 className="mb-2">{user.firstName} {user.lastName}</h3>
                    <p className="text-muted"><strong>Email:</strong> {user.email}</p>
                </div>

                {/* Recent Reviews Section */}
                <div className="reviews-section animated">
                    <h2 className="h4 mb-4">Recent Reviews</h2>
                    {reviews.length === 0 ? (
                        <p className="text-muted">You haven't added any reviews yet.</p>
                    ) : (
                        <div className="row row-cols-1 g-3">
                            {reviews.map((review) => (
                                <div key={review.id} className="col">
                                    <div className="review-item animated">
                                        <div className="d-flex justify-content-between mb-2">
                                            <h5 className="card-title mb-0">{review.movie.title}</h5>
                                            <span className="badge bg-primary">Rating: {review.rating}/10</span>
                                        </div>
                                        <p className="card-text">{review.comment}</p>
                                        <p className="card-text text-muted">
                                            <small>Posted on: {new Date(review.createdAt).toLocaleDateString()}</small>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                    background: linear-gradient(135deg, #1a1a1a 0%, #4a0000 100%);
                    color: #fff;
                    font-family: 'Arial', sans-serif;
                }

                .app-header {
                    background: linear-gradient(135deg, #ff2323 0%, #000000 100%);
                    color: white;
                    padding: 4rem 0;
                    text-align: center;
                    margin-bottom: 3rem;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
                }

                .app-title {
                    font-size: 3rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    animation: fadeInDown 1s ease-in-out;
                }

                .profile-section, .reviews-section {
                    background: #f0f0f0; /* Light grey background */
                    border-radius: 15px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    color: #333; /* Text color for light background */
                }

                .profile-section:hover, .reviews-section:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.9);
                }

                .review-item {
                    background: #f8f8f8; /* Lighter grey for review items */
                    border-radius: 10px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    transition: background 0.3s ease;
                }

                .review-item:hover {
                    background: #e8e8e8; /* Slightly darker on hover */
                }

                .text-muted {
                    color: rgba(0, 0, 0, 0.6); /* Adjusted for light background */
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
                    to { transform: rotate(360deg); }
                }

                .animated {
                    animation: fadeIn 0.5s ease-in-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .app-footer {
                    background: #1a1a1a;
                    color: #bbb;
                    padding: 2rem 0;
                    text-align: center;
                    margin-top: 3rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                @media (max-width: 768px) {
                    .app-title { font-size: 2rem; }
                    .profile-section, .reviews-section { padding: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default UserProfile;