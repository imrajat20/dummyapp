import './App.css';
import SignUp from './components/SignUp/SignUp';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
