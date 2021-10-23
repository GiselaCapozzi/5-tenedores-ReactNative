import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';

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
            title='Escribe una opinión'

          />
        ) : (
          <View>
            <Text>Para escribir un comentario es necesrio estar logueado</Text>
          </View>
        )
      }
    </View>
  )
};

const styles = StyleSheet.create({

});

export default ListReview;