import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import { size } from 'lodash';

import Loading from '../components/Loading';

import { firebaseApp } from '../utils/firebase';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

// Se va a mostrar los restaurantes que el usuario marque como favoritos
const Favorites = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [userLogged, setUserLogged] = useState(false);

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
  };

  if (!restaurants) {
    return (
      <Loading
        isVisible={true}
        text='Cargando restaurantes'
      />
    )
  } else if (size(restaurants) === 0) {
    return (
      <NotFoundRestaurant />
    )
  }

  return (
    <View>
      <Text>
        Favorites...
      </Text>
    </View>
  )
};

const NotFoundRestaurant = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Icon
        type='material-community'
        name='alert-outline'
        size={50}
        color='#00a680'
      />
      <Text style={{ 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center',
        color: '#00a680' }}>
        No tienes restaurantes en tu lista
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default Favorites;