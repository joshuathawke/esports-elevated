import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tournaments from './screens/Tournaments/Tournaments';
import Matches from './screens/Matches/Matches';
import Login from './screens/LoginPage/Login';
import SignupPage from './screens/SignUpPage/SignupPage';
import Teams from './screens/Teams/Teams';
import CreateMatch from './screens/Matches/CreateMatch';
import SingleMatch from './screens/Matches/SingleMatch';
import ProfilePage from './screens/ProfilePage/ProfilePage';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/creatematch" element={<CreateMatch />} />
        <Route path="/match/:id" element={<SingleMatch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;