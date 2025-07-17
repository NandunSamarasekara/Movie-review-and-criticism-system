import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        retypePassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.retypePassword) {
            setError('Passwords don\'t match!');
            return;
        }

        try {
            await createUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            alert('Registration Successful!');
            navigate('/login');
        } catch (error) {
            if (error.message === 'Email is already in use') {
                setError('Email is already in use!');
            } else {
                setError('Error registering user');
            }
            console.error('Register error:', error);
        }
    };

    return (
        <div className="movie-app">
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">Create Your Account</h1>
                </div>
            </header>
            <main className="container">
                <div className="form-container">
                    {error && <div className="alert alert-danger animated fadeIn">{error}</div>}
                    <form onSubmit={handleSubmit} className="form-content">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control animated"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-4">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control animated"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control animated"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control animated"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="retypePassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control animated"
                                id="retypePassword"
                                name="retypePassword"
                                value={formData.retypePassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg animated">Register</button>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-muted" style={{ color: '#fff' }}>Already have an account? <a href="/login" className="text-decoration-none text-warning">Login here</a></p>
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
                    max-width: 600px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
                    border: 1px solid rgba(253, 253, 253, 0.2);
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

                .alert {
                    margin-bottom: 1.5rem;
                    border-radius: 10px;
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
                    color: #bbb;
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

export default RegisterPage;