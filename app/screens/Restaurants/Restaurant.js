import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Rating, ListItem, Icon } from 'react-native-elements';
import { map } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';

import Loading from '../../components/Loading';
import Carusel from '../../components/Carousel';
import Map from '../../components/Map';
import ListReview from '../../components/Restaurants/ListReview';

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  // navigation.setOptions({ title: name });
  // console.log(navigation);

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false)
  })

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurants")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setRestaurant(data);
          setRating(data.rating);
        });
    }, [])
  );

  useEffect(() => {
    if (userLogged && restaurant) {
      db.collection('favorites')
        .where('idRestaurant', '==', restaurant.id)
        .where('idUser', '==', firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true)
          }
        })
    }
  }, [userLogged, restaurant])

  const addFavorite = () => {
    if (!userLogged) {
      showMessage({
        message: 'Para usar el sistema de favoritos tienes que estar logueado',
        type: 'info'
      })
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idRestaurant: restaurant.id
      }
      db.collection('favorites')
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          showMessage({
            message: 'Restaurante añadido a favoritos',
            type: 'success'
          })
        })
        .catch(() => {
          showMessage({
            message: 'Error al añadir el restaurante a favoritos',
            type: 'danger'
          })
        })
    }
  };

  const removeFavorite = () => {
    db.collection('favorites')
      .where('idRestaurant', '==', restaurant.id)
      .where('idUser', '==', firebase.auth().currentUser.uid)
      .get()
      .then(response => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection('favorites')
          .doc(idFavorite)
          .delete()
          .then(() => {
            setIsFavorite(false);
            showMessage({
              message: 'Restaurante eliminado de favoritos',
              type: 'success'
            })
          })
          .catch(() => {
            showMessage({
              message: 'Error al eliminar el restaurante de favoritos',
              type: 'warning'
            })
          })
        })
      })
  }

  if (!restaurant) return (<Loading isVisible={true} text='Cargando...' />)

  return (
    <ScrollView vertical style={styles.viewBody}>
      <View style={styles.viewFavorite}>
        <Icon
          type='material-community'
          name={isFavorite ? 'heart' : 'heart-outline'}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? '#f00' : '#000'}
          size={35}
          underlayColor='transparent'
        />
      </View>
      <Carusel
        arrayImages={restaurant.images}
        height={250}
        width={screenWidth}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
      <ListReview
        navigation={navigation}
        idRestaurant={restaurant.id}
      />
      <FlashMessage
        position='top'
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

  const listInfo = [
    {
      text: address,
      iconName: 'map-marker',
      iconType: 'material-community',
      action: null
    },
    {
      text: '111 222 333',
      iconName: 'phone',
      iconType: 'material-community',
      action: null
    },
    {
      text: 'gisecapozzi@gmail.com',
      iconName: 'at',
      iconType: 'material-community',
      action: null
    }
  ]

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>Información sobre el restaurante</Text>
      <Map
        location={location}
        name={name}
        height={100}
      />
      <View style={styles.containerListItem}>
        {
          map(listInfo, (item, index) => (
            <ListItem key={index}>
              <ListItem.Content>
                <ListItem.Title style={styles.text}>
                  <ListItem.Chevron
                    name={item.iconName}
                    type={item.iconType}
                    color={"#00a680"}
                    iconStyle={styles.icon}
                  />
                  {item.text}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </View>
    </View>
  )
};

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
  },
  containerListItem: {
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1
  },
  icon: {
    marginRight: 20
  },
  text: {
    paddingLeft: 25,
    fontSize: 12,
    textAlign: 'center'
  },
  viewFavorite: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15
  }
});

export default Restaurant;