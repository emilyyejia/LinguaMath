import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import AboutPage from '../AboutPage/AboutPage'; 
import HomePage from '../Homepage/HomePage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import NavBar from '../../components/NavBar/NavBar';
import SignUpPage from '../SignUpPage/SignUpPage';
import { getUser } from '../../services/authService';
import LogInPage from '../LogInPage/LogInPage';
import Footer from "../../components/Footer/Footer";
import SupportPage from '../SupportPage/SupportPage';
import DeleteAccountPage from '../DeleteAccountPage/DeleteAccountPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className='App d-flex flex-column min-vh-100'>
      <NavBar user={user} setUser={setUser}/>
      <section id='main-section'>
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/account" element={<DeleteAccountPage user={user} setUser={setUser} />} />
            <Route path="*" element={null}/>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser}/>}/>
            <Route path="/login" element={<LogInPage setUser={setUser}/>}/>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/account" element={<DeleteAccountPage user={user} setUser={setUser} />} />
            <Route path="*" element={null}/>
          </Routes>
        )}
      </section>
        <Footer />
    </main>
  );
}


