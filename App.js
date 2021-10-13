import React, { useEffect } from 'react';
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from './app/utils/firebase';

const App  = () => {
  return (
    <Navigation />
  );
};

export default App;