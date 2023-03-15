import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Click the link below to view the home listings:</p>
      <Link to="/listings">View Home Listings</Link>
    </div>
  );
};

export default Home;
