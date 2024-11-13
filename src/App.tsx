import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { PeoplePage } from './components/PeoplePage';
import { CategoryPage } from './components/CategoryPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-gradient-to-r from-slate-900 to-slate-300 text-white p-4">
          <div className="max-w-6xl mx-auto">
            <a href="/" className="text-xl font-bold text-amber-300">
              The StarWars Explorer
            </a>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/category/people" element={<PeoplePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
