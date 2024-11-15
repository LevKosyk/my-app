import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand">
                    <strong>Home</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/products" className="nav-link active">
                                <i className="bi bi-box"></i> Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogOut} className="btn btn-danger ms-3">
                                LogOut
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
