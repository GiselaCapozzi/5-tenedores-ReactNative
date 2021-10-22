import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, Dimensions } from 'react-native';

import Loading from '../../components/Loading';
import Carusel from '../../components/Carousel';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

const Restaurant = (props) => {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
  navigation.setOptions({ title: name });
    db.collection('restaurants')
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setRestaurant(data);
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Restaurant;