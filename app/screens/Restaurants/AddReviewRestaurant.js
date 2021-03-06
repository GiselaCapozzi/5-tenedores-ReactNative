import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';

import Loading from '../../components/Loading';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app'
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const AddReviewRestaurant = (props) => {
  const { navigation, route } = props;
  const { idRestaurant } = route.params;

  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addReview = () => {
    if (!rating) {
      showMessage({
        message: 'No has dado ninguna puntuación',
        type: 'warning'
      })
    } else if (!title) {
      showMessage({
        message: 'El título es obligatorio',
        type: 'warning'
      })
    } else if (!review) {
      showMessage({
        message: 'El comentario es obligatorio',
        type: 'warning'
      })
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const payload = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idRestaurant: idRestaurant,
        title: title,
        review: review,
        rating: rating,
        createAt: new Date(),
        time: new Date().toLocaleTimeString()
      }
      db.collection('reviews')
        .add(payload)
        .then(() => {
          updateRestaurant();
        })
        .catch(() => {
          showMessage({
            message: 'Error al enviar la review',
            type: 'danger'
          })
          setIsLoading(false);
        })
    }
  }

  const updateRestaurant = () => {
    const restaurantRef = db.collection("restaurants").doc(idRestaurant);

    restaurantRef.get().then((response) => {
      const restaurantData = response.data();
      const ratingTotal = restaurantData.ratingTotal + rating;
      const quantityVoting = restaurantData.quantityVoting + 1;
      const ratingResult = ratingTotal / quantityVoting;

      restaurantRef
        .update({
          rating: ratingResult,
          ratingTotal,
          quantityVoting,
        })
        .then(() => {
          setIsLoading(false);
          navigation.goBack();
        });
    });
  };

  const reviewsStar = [
    'Pesimo',
    'Deficiente',
    'Normal',
    'Muy Bueno',
    'Excelente'
  ];

  return (
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={reviewsStar}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => {
            setRating(value);          
          }}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder='Titúlo'
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder='Comentario...'
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setReview(e.nativeEvent.text)}
        />
        <Button
          title='Enviar comentario'
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={addReview}
        />
      </View>
      <FlashMessage position='bottom' />
      <Loading isVisible={isLoading} text="Enviando comentario" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 110,
    backgroundColor: '#f2f2f2'
  },
  formReview: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginTop: 40
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 150,
    width: '100%',
    padding: 0,
    margin: 0
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 10,
    width: '95%'
  },
  btn: {
    backgroundColor: '#00a680'
  }
});

export default AddReviewRestaurant