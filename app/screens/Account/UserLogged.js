import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import {  } from 'react-native-element';
import firebase from "firebase";

const UserLogged = () => {
  return (
    <View>
      <Text>
        UserLogged...
      </Text>
      <Button 
        title="Cerrar sesión"
        onPress = {() => firebase.auth().signOut()}
      />
    </View>
  )
};

const styles = StyleSheet.create({

})

export default UserLogged;