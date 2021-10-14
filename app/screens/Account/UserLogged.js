import React, { useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FlashMessage from "react-native-flash-message";
import firebase from "firebase";

import Loading from '../../components/Loading';

const UserLogged = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  return (
    <View style={styles.viewUserInfo}>
      <Text>InfoUser...</Text>
      <Text>AccountOptions</Text>
      <Button 
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <FlashMessage position="center" />
      <Loading text={loadingText} isVisible={loading}/>
    </View>
  )
};

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
   color: "#00a680"
  }
})

export default UserLogged;