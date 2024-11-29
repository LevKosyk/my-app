import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ListScreen from './components/ListScreen/ListScreen';
import CreateScreen from './components/CreateScreen/CreateScreen';
import UpdateScreen from './components/UpdateScreen/UpdateScreen';
import HomeScreen from './components/HomeScreen/HomeScreen'
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/create' element={<CreateScreen />} />
          <Route path='/products' element={<ListScreen />} />
          <Route path='/update/:id' element={<UpdateScreen />} />
        </Routes>
    </Router>
  );
}

export default App;
