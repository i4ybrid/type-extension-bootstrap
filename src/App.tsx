import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.global.css';
import NavBar from './components/NavBar';
import { AppProvider } from './components/AppContext';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <AppProvider>
        <Outlet />
      </AppProvider>
    </div>
  );
}
