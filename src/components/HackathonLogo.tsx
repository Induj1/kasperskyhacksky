
import React from 'react';
import { Link } from 'react-router-dom';

const HackathonLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/hackathon-logo.png" 
        alt="HackSky Hackathon Logo" 
        className="h-10 w-auto object-contain"
        style={{ maxWidth: '100%', display: 'block' }}
      />
    </Link>
  );
};

export default HackathonLogo;
