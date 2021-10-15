import React, { useEffect } from 'react';
// import { LogBox } from 'react-native';
import { firebaseApp } from './app/utils/firebase';

import Navigation from './app/navigations/Navigation';

// LogBox.ignoreLogs(["Setting a timer"]);

const App  = () => {
  return (
    <Navigation />
  );
};

export default App;