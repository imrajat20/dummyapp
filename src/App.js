import './App.css';
import SignUp from './components/SignUp/SignUp';
import WelcomePage from './components/WelcomePage/WelcomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Password from './components/PasswordReset/Password';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.auth.token);
  console.log('token',token);
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<SignUp />} />
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Password' element={<Password/>}/>
        <Route path='/ExpenseForm' element={<ExpenseForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
