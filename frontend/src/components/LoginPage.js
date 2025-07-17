import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(formData.email, formData.password);
            localStorage.setItem('userId', user.id);
            alert('Login successful');
            navigate('/');
        } catch (error) {
            alert('Invalid login credentials');
        }
    };

    return (
        <div className="movie-app">
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">Welcome Back</h1>
                </div>
            </header>
            <main className="container">
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="form-content">
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control animated"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control animated"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary btn-lg animated">Login</button>
                        </div>
                        <div className="text-center">
                            <p className="text-muted">Don't have an account? <a href="/register" className="text-decoration-none text-warning">Register here</a></p>
                        </div>
                    </form>
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

                .form-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: calc(100vh - 200px);
                }

                .form-content {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 15px;
                    padding: 2.5rem;
                    width: 100%;
                    max-width: 400px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .form-content:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.9);
                }

                .form-label {
                    color: #fff;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                .form-control {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    border-bottom: 2px solid #ff4444;
                    color: #fff;
                    padding: 0.75rem 1rem;
                    font-size: 1rem;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .form-control:focus {
                    border-color: #ff6666;
                    box-shadow: 0 0 10px rgba(255, 100, 100, 0.5);
                    outline: none;
                }

                .form-control::placeholder {
                    color: rgba(255, 255, 255, 0.7);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #ff2323, #800000);
                    border: none;
                    padding: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: background 0.3s ease, transform 0.3s ease;
                }

                .btn-primary:hover {
                    background: linear-gradient(135deg, #ff4444, #a00000);
                    transform: scale(1.05);
                }

                .animated {
                    animation: fadeIn 0.5s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .app-footer {
                    background: #1a1a1a;
                    color: #ffffff;
                    padding: 2rem 0;
                    text-align: center;
                    margin-top: 3rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                @media (max-width: 768px) {
                    .app-title {
                        font-size: 2rem;
                    }

                    .form-content {
                        padding: 1.5rem;
                    }

                    .form-control {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoginPage;