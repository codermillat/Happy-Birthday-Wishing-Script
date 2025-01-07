import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const occasions = [
    { id: 'birthday', name: 'Birthday Wishes' },
    { id: 'newyear', name: 'New Year Wishes' },
    { id: 'eid', name: 'Eid Mubarak' },
    { id: 'anniversary', name: 'Anniversary Wishes' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Multi-Occasion Wishing App
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {occasions.map((occasion) => (
          <Link
            key={occasion.id}
            to={`/customize/${occasion.id}`}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
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
  );
}

export default Home;