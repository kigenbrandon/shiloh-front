import '../App.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import Signup from './Signup'
import Login from './Login'
import Admin from './admin/Admin'

function App() {
  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<h1>Welcome to Shiloh SMS APP</h1>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>

  );
}

export default App;
