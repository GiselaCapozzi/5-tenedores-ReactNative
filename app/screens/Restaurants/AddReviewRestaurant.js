import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';

const AddReviewRestaurant = (props) => {
  const { navigation, route } = props;
  const { idRestaurant } = route.params;

  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addReview = () => {
    console.log('rating:', rating);
    console.log('title:', title);
    console.log('review:', review);
  }

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
          onFinishRating={(value) => setRating(value)}
        />
      </View>
      <View style={styles.formReview}>
        <Input 
          placeholder='Titúlo'
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input 
          title='Comentario...'
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