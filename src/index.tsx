import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import TypeExtensionForm from './pages/TypeExtensionForm';
import CodebaseForm from './pages/CodebaseForm';
import UnitTestForm from './pages/UnitTestForm';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<TypeExtensionForm />} />
        <Route path="/typeExtension" element={<TypeExtensionForm />} />
        <Route path="/codebase" element={<CodebaseForm />} />
        <Route path="/unitTest" element={<UnitTestForm />} />
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);
