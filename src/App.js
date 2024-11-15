import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ListScreen from './screens/Product/ListScreen/ListScreen'
import { isAuthenticated } from './utils/auth'

import './App.css';


const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/home' element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
          <Route path='/products' element={<PrivateRoute><ListScreen /></PrivateRoute>} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
