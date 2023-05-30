import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './screens/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tournaments from './screens/Tournaments';
import Matches from './screens/Matches';
import Login from './screens/Login';
import SignupPage from './screens/SignupPage';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;