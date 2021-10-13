import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { isEmpty, set, size } from 'lodash';
import { showMessage } from 'react-native-flash-message';
import firebase from "firebase";
import { useNavigation } from '@react-navigation/native';

import { validateEmail } from '../../utils/validations';
import Loading from "../Loading";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text
    })
  }

  const onSubmit = () => {
    if(isEmpty(formData.email) || 
       isEmpty(formData.password)) {
      showMessage({
        message:'Todos los campos son obligatorios',
        type: 'danger'
      })
    } else if(!validateEmail(formData.email)) {
      showMessage({
        message:"El email no es válido",
        type: "danger"
      })
    } else {
      setLoading(true)
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate('account');
        })
        .catch(() => {
          setLoading(false);
          showMessage({
            message: "Email o contraseña incorrecta"
          })
        })
    }
  }

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder='Correo electronico'
        containerStyle={styles.inputForm}
        onChange={e => onChange(e, 'email')}
        rightIcon={
          <Icon
            type='material-community'
            name='at'
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder='Contraseña'
        containerStyle={styles.inputForm}
        // De tipo password
        password={true}
        // Oculta la contraseña
        secureTextEntry={showPassword ? false : true}
        onChange={e => onChange(e, 'password')}
        rightIcon={
          <Icon 
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title='Iniciar sesión'
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando sesion"/>
    </View>
  )
};

const defaultFormValue = () => {
  return {
    email: '',
    password: ''
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  inputForm: {
    width: '100%',
    marginTop: 20
  },
  btnContainerLogin: {
    marginTop: 20,
    width: '95%'
  },
  btnLogin: {
    backgroundColor: '#00a680'
  },
  iconRight: {
    color: "#c1c1c1"
  }
})

export default LoginForm;