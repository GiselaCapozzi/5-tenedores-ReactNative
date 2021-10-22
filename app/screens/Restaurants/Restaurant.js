import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Rating } from 'react-native-elements';

import Loading from '../../components/Loading';
import Carusel from '../../components/Carousel';
import Map from '../../components/Map';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

const Restaurant = (props) => {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
  navigation.setOptions({ title: name });
    db.collection('restaurants')
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setRestaurant(data);
        setRating(data.rating);
      })
  }, [navigation])

  if (!restaurant) return (<Loading isVisible={true} text='Cargando...' />)

  return (
    <ScrollView vertical style={styles.viewBody}>
      <Carusel 
        arrayImages={restaurant.images}
        height={250}
        width={screenWidth}
      />
      <TitleRestaurant 
        name={restaurant.name}
        description={restaurant.description}
        rating={restaurant.rating}
      />
      <RestaurantInfo 
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
    </ScrollView>
  )
};

const TitleRestaurant = (props) => {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.nameRestaurant}>{name}
        <Rating 
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
        </Text>
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  )
}

const RestaurantInfo = (props) => {
  const { location, name, address } = props;

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>Información sobre el restaurante</Text>
      <Map 
        location={location}
        name={name}
        height={100}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
  },
  viewRestaurantTitle: {
    padding: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: 'grey'
  },
  rating: {
    position: 'absolute',
    right: 0
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25
  },
  restaurantInfoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default Restaurant;