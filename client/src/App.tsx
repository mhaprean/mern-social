import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import UserPostsTab from './components/userpage/UserPostsTab';
import AboutTab from './components/userpage/AboutTab';
import FollowingTab from './components/userpage/FollowingTab';
import FollowersTab from './components/userpage/FollowersTab';
import PhotosTab from './components/userpage/PhotosTab';

function App() {
  return (
    <div className="App">
      <Navigation />

      <div className="bg-sky-50 h-full min-h-screen pt-14">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/user/:id" element={<UserPage />}>
            <Route path="" element={<UserPostsTab />}></Route>
            <Route path="posts" element={<UserPostsTab />}></Route>
            <Route path="about" element={<AboutTab />}></Route>
            <Route path="following" element={<FollowingTab />}></Route>
            <Route path="followers" element={<FollowersTab />}></Route>
            <Route path="photos" element={<PhotosTab />}></Route>
          </Route>
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
