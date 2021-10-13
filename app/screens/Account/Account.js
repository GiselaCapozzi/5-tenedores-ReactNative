import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import firebase from 'firebase';

import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";

const Account = () => {

  /* Lo inicializamos como null, porque no sabemos si el 
  usuario esta loggueado o no */
  const [login, setLogin] = useState(null);

  useEffect(() => {
    // Cuando el estado del auth cambie, notificamelo
    firebase.auth().onAuthStateChanged(user => {
      /* Si devuelve: 
      - Null --> El usuario no esta loggeado
      - Todos los datos del usuario --> Usuario loggeado */
      
      // Si el usuario es nulo, por lo tanto no esta loggueado
      !user ? setLogin(false) : setLogin(true);
    })
  }, []);
  /* El corchete sirve para cuando algun estado o variable que
  llegue por props sea modificada, se vuelve a ejecutar, si no
  se le pasa nada se ejecuta cuando el componente se monte y 
  ahi acaba su función*/

  if(login === null) return <Loading isVisible={true} text="Cargando..."/>

  return login ? <UserLogged /> : <UserGuest />;
};

export default Account;