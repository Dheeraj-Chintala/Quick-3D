import React from 'react';
import Navbar from './components/Layout/Navbar';
import Workspace from './components/Editor/Workspace';
import './App.css'; 

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <Navbar />
      <Workspace />
    </div>
  );
}

export default App;
