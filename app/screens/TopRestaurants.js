import React, { useState, useEffect } from 'react';
import { View, Text }  from 'react-native';
import FlashMessage from 'react-native-flash-message';

import ListTopRestaurants from '../components/Ranking/ListTopRestaurants';

import { firebaseApp } from '../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const TopRestaurants = (props) => {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);

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
      <ListTopRestaurants 
      restaurants={restaurants}
      navigation={navigation}
      />
      <FlashMessage position='center'/>
    </View>
  )
};

export default TopRestaurants;