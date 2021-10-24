import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button, Avatar, Rating, Icon } from 'react-native-elements';

import { firebaseApp } from '../../utils/firebase';
import firebase from "firebase/app";
import 'firebase/firestore';
import { forEach } from "lodash";

const db = firebase.firestore(firebaseApp);

const ListReview = (props) => {
  const { navigation, idRestaurant } = props;
  const [userLogged, setUserLogged] = useState(false);
  const [reviews, setReviews] = useState([]);
  console.log(reviews);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    db.collection('reviews')
      .where('idRestaurant', '==', idRestaurant)
      .get()
      .then((response)=> {
        const resultReview = [];
        response.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          resultReview.push(data);
        });
        setReviews(resultReview);
      })
  }, [])

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