// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PizzaList from './components/PizzaList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import AdminPage from './components/AdminPage';
import { useSelector } from 'react-redux';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.user.user);

  console.log(user);

  return (
    <Router>
      <div className="app">
        <Header setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<PizzaList searchTerm={searchTerm} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<AuthPage />} />
          {user && user.role === 'admin' && (
            <Route path="/admin" element={<AdminPage />} />
          )}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;