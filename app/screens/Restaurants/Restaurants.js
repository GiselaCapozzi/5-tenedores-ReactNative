import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';

// Se listan todos los restaurantes
const Restaurants = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>
        Restaurants...
      </Text>
      {
        user && (
          <Icon
            reverse
            type='material-community'
            name='plus'
            color='#00a680'
            containerStyle={styles.btnContainer}
          />
        )
      }
    </View>
  )
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5
  }
})

export default Restaurants;