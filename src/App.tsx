import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeListings from './components/Homelistings';
import Home from './components/Home';
import scrapeData from './scrapeData';

const App = () => {

  return (
    <div className="App">
      <div className="container">
        <Routes>
        <Route  path="/" Component={Home} />
        <Route path="/listings" Component={() => <HomeListings listingsHtml={'https://www.corcoran.com/search/for-sale/location/northwest-harris-tx-17534130/regionId/119'} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
