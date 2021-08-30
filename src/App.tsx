import React from 'react';
import './App.global.css';
import NavBar from './components/NavBar';
import QuestionForm from './components/QuestionForm';

function App() {
  return (
    <div className="App">
      <NavBar />
      <QuestionForm />
    </div>
  );
}

export default App;
