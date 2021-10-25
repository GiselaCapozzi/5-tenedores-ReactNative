import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';

import { firebaseApp } from '../utils/firebase';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

// Se va a mostrar los restaurantes que el usuario marque como favoritos
const Favorites = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [userLogged, setUserLogged] = useState(false);

  console.log(restaurants);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  })

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = firebase.auth().currentUser.uid;
        db.collection('favorites')
          .where('idUser', '==', idUser)
          .get()
          .then((response) => {
            const idRestaurantArray = [];
            response.forEach((doc) => {
              idRestaurantArray.push(doc.data().idRestaurant);
            });
            getDataRestaurant(idRestaurantArray).then((response) => {
              const restaurants = [];
              response.forEach((doc) => {
                const restaurant = doc.data();
                restaurant.id = doc.id;
                restaurants.push(restaurant);
              });
              setRestaurants(restaurants);
            })
          })
      }
    }, [userLogged])
  )

  const getDataRestaurant = (idRestaurantArray) => {
    const arrayRestaurants = [];
    idRestaurantArray.forEach((idRestaurant) => {
      const result = db.collection('restaurants')
      .doc(idRestaurant)
      .get();
      arrayRestaurants.push(result);
    })
    return Promise.all(arrayRestaurants);
  }

  return (
    <View>
      <Text>
        Favorites...
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({

});

export default Favorites;