import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const occasions = [
    { id: 'birthday', name: 'Birthday Wishes', icon: '🎂' },
    { id: 'newyear', name: 'New Year Wishes', icon: '🎉' },
    { id: 'eid', name: 'Eid Mubarak', icon: '🌙' },
    { id: 'anniversary', name: 'Anniversary Wishes', icon: '💑' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Multi-Occasion Wishing App
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occasion) => (
            <Link
              key={occasion.id}
              to={`/customize/${occasion.id}`}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {occasion.icon}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {occasion.name}
              </h2>
              <p className="text-gray-600">
                Create and share personalized {occasion.name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;