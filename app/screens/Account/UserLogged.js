import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import FlashMessage from "react-native-flash-message";
import firebase from 'firebase';

import Loading from '../../components/Loading';
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

const UserLogged = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [realoadUserInfo, setReloadUserInfo] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setReloadUserInfo(false);
  }, [realoadUserInfo])

  return (
    <View style={styles.viewUserInfo}>
      {
        userInfo ? <InfoUser
          userInfo={userInfo}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
        /> : null
      }
      <AccountOptions
        userInfo={userInfo} 
        setReloadUserInfo={setReloadUserInfo}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <FlashMessage position="center" />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  )
};

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: '100%',
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