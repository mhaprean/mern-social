import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Post from './components/Post';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Navigation />

      <div className="bg-sky-50 h-full min-h-screen p-2 pt-16">
        <div className="text-xl font-bold max-w-screen-lg m-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/*" element={<NotFound />} />
            
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
