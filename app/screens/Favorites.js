import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import FlashMessage, { showMessage } from 'react-native-flash-message';

import Loading from '../components/Loading';

import { firebaseApp } from '../utils/firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import { set } from 'lodash';

const db = firebase.firestore(firebaseApp);

// Se va a mostrar los restaurantes que el usuario marque como favoritos
const Favorites = (props) => {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

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
      setReloadData(false);
    }, [userLogged, reloadData])
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

  if (!userLogged) {
    return (
      <UserNoLogged
        navigation={navigation}
      />
    )
  }

  if (restaurants?.length === 0) {
    return (
      <NotFoundRestaurant />
    )
  }

  return (
    <View style={styles.viewBody}>
      {
        restaurants ? (
          <FlatList
            data={restaurants}
            renderItem={(restaurant) => <Restaurant
              restaurant={restaurant}
              keyExtractor={(item, index) => index.toString()}
              setIsLoading={setIsLoading}
              setReloadData={setReloadData}
            />}
          />
        ) : (
          <View style={styles.loaderRestaurants}>
            <ActivityIndicator
              size='large'
              color='#00a680'
            />
            <Text style={{ textAlign: 'center' }}>Cargando restaurantes</Text>
          </View>
        )
      }
      <FlashMessage position='center' />
      <Loading text='Eliminando restaurante' isVisible={isLoading}/>
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
        color: '#00a680'
      }}>
        No tienes restaurantes en tu lista
      </Text>
    </View>
  )
};

const UserNoLogged = (props) => {
  const { navigation } = props;

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon
        type='material-community'
        name='alert-outline'
        size={50}
      />
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Necesitas estar logueado para ver esta sección
      </Text>
      <Button
        title='Ir al login'
        containerStyle={{
          marginTop: 20,
          width: '80%'
        }}
        buttonStyle={{
          backgroundColor: '#00a680'
        }}
        onPress={() => navigation.navigate('account', { screen: 'login' })}
      />
    </View>
  )
}

const Restaurant = (props) => {
  const { restaurant, setIsLoading, setReloadData } = props;
  const { name, images, id } = restaurant.item;

  const confirmRemoveFavorite = () => {
    Alert.alert(
      'Eliminar restaurante de favotritos',
      '¿Estas seguro que quieres eliminar el restaurante de favoritos?',
      [
        {
          text: 'Cancelar',
          styles: 'cancel'
        },
        {
          text: 'Eliminar',
          onPress: removeFavorite
        }
      ],
      {
        cancelable: false
      }
    )
  }

  const removeFavorite = () => {
    setIsLoading(true);
    db.collection('favorites')
    .where('idRestaurant', '==', id)
    .where('idUser', '==', firebase.auth().currentUser.uid)
    .get()
    .then((response) => {
      response.forEach((doc) => {
        const idFavorite = doc.id;
        db.collection('favorites')
        .doc(idFavorite)
        .delete()
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          showMessage({
            message: 'Restaurante eliminado correctamente',
            type: 'success'
          })
        })
        .catch(() => {
          setIsLoading(false);
          showMessage({
            message: 'Error al eliminar el restaurante',
            type: 'danger'
          })
        })
      })
    })
  }

  return (
    <View style={styles.restaurant}>
      <TouchableOpacity
        onPress={() => console.log('IR')}
      />
      <Image
        resizeMode='cover'
        style={styles.image}
        PlaceholderContent={<ActivityIndicator
          color='#fff'
        />}
        source={
          images[0]
            ? { uri: images[0] } :
            require('../../assets/img/no-image.png')
        }
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Icon
          type='material-community'
          name='heart'
          color='#f00'
          containerStyle={styles.favorite}
          onPress={confirmRemoveFavorite}
          underlayColor='transparent'
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  loaderRestaurants: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  restaurant: {
    margin: 10
  },
  image: {
    width: '100%',
    height: 180
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: -30,
    backgroundColor: '#fff'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15
  },
  favorite: {
    marginTop: -35,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 100
  }
});

export default Favorites;