import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from '@pages/create';
import Join from '@pages/join';
import Header from '@components/header';
import NotFound from '@pages/not_found';

const Home = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Create />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/room/:room_id/:user_id" element={<Room />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
