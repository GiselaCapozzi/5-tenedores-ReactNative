import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, Avatar, Rating, Icon } from 'react-native-elements';

import { firebaseApp } from '../../utils/firebase';
import firebase from "firebase/app";

const db = firebase.firestore(firebaseApp);

const ListReview = (props) => {
  const { navigation, idRestaurant, setRating } = props;
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  })

  return (
    <View>
      {
        userLogged ? (
          <Button
            title="Escribe una opinión"
            buttonStyle={styles.btnAddReview}
            titleStyle={styles.btnTitleAddReview}
            icon={{
              type: 'material-community',
              name: 'square-edit-outline',
              color: '#00a680'
            }}
            onPress={() => navigation.navigate('add-review-restaurant', {
              idRestaurant: idRestaurant
            })}
          />
        ) : (
          <View>
            <Text
              style={{ textAlign: 'center', color: '#00a680', padding: 20 }}
              onPress={() => navigation.navigate('login')}
            >Para escribir un comentario es necesrio estar logueado {" "}
            <Text 
            style={{ fontWeight: 'bold' }}
            >{"\n"}Pulsa AQUI para iniciar sesión
            </Text>
            </Text>
          </View>
        )
      }
    </View>
  )
};

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: 'transparent'
  },
  btnTitleAddReview: {
    color: '#00a680'
  }
});

export default ListReview;