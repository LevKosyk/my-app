import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import { saveToken } from '../../utils/auth';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:3005/api/users/login', { email, password });
            console.log(response.data);
            saveToken(response.data.token);
            navigate('/products');
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    return (
        <div>
        <Navbar />
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100 mb-3">Submit</button>
                    <div className="text-center">
                        <p>Don't have an account? <Link to="/register" className="link-primary">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default LoginScreen;
