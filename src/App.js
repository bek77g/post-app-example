import './App.css';
import { Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PostList from './components/PostList';
import Layout from './components/Layout';
import ResetPWD from './pages/ResetPWD';
import ForgotPWD from './pages/ForgotPWD';
import ChangePWD from './pages/ChangePWD';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-pwd' element={<ForgotPWD />} />
        <Route path='/change-pwd' element={<ChangePWD />} />
        <Route path='/reset-password/:token' element={<ResetPWD />} />
      </Route>
    </Routes>
  );
}

export default App;
