import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Post from './components/Post';
import Homepage from './pages/Homepage';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Navigation />

      <div className="bg-sky-50 min-h-[100vh] p-2">
        <div className="text-xl font-bold max-w-screen-lg m-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <p>MERN app</p>
          <Post />
        </div>
      </div>
    </div>
  );
}

export default App;
