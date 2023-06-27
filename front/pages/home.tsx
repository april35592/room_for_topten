import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from '@pages/create';
import Join from '@pages/join';
import Room from '@pages/room';
import Header from '@components/header';
import NotFound from '@pages/not_found';
import HowTo from '@components/how_to';

const Home = () => {
  const [how, setHow] = useState<Boolean>(false);

  const openHow = () => {
    setHow(true);
  };

  const closeHow = () => {
    setHow(false);
  };

  return (
    <BrowserRouter>
      {how ? <HowTo closeHow={closeHow} /> : null}
      <div id="container">
        <Header openHow={openHow} />
        <Routes>
          <Route path="/index.html" element={<Create />} />
          <Route path="/" element={<Create />} />
          <Route path="/join" element={<Join />} />
          <Route path="/room/:room_id" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Home;
