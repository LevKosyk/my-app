import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ListScreen from './components/ListScreen';
import CreateScreen from './components/CreateScreen';
import UpdateScreen from './components/UpdateScreen';
import HomeScreen from './components/HomeScreen'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/create' element={<CreateScreen />} />
          <Route path='/products' element={<ListScreen />} />
          <Route path='/update/:id' element={<UpdateScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
