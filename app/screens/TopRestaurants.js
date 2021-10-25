import React, { useState, useEffect } from 'react';
import { View, Text }  from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';

import { firebaseApp } from '../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const TopRestaurants = (props) => {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);

  console.log(restaurants);

  useEffect(() => {
    db.collection('restaurants')
    .orderBy('rating', 'desc')
    .limit(5)
    .get()
    .then((response) => {
      const restaurantArray = [];
      response.forEach((doc) => {
        const data = doc.data();
        data.id = doc.data();
        restaurantArray.push(data);
      });
      setRestaurants(restaurantArray);
    })
  }, [])

  return (
    <View>
      <Text>
        TopRestaurants...
      </Text>
      <FlashMessage position='center'/>
    </View>
  )
};

export default TopRestaurants;