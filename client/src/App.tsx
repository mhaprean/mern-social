import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Post from './components/Post';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className="App">
      <Navigation />

      <div className="bg-sky-50 h-full min-h-screen p-2 pt-16">
        <div className="max-w-xl m-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
