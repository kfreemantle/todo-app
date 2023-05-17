import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Todo from './Components/Todo';
import List from './Components/List';
import SettingsForm from './Components/SettingsForm';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/list" element={<List />} />
        <Route path="/settings" element={<SettingsForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
