import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-20">
      <div className="container mx-auto max-w-2xl p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-500">
          Soshage 💡
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your AI Suggesting Partner</p>
      </div>
    </header>
  );
};

export default Header;