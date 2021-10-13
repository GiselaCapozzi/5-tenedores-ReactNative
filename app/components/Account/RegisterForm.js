import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { validateEmail } from '../../utils/validations';
import { size, isEmpty } from 'lodash';
import firebase from "firebase";
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import Loading from "../Loading";

const RegisterForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onSubmit = () => {
    if (isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)) {
      showMessage({
        message: 'Todos los campos son obligatorios',
        type: 'danger'
      })
      // console.log('Todos los campos son obligatorios');
    } else if (!validateEmail(formData.email)) {
      showMessage({
        message: "El email no es válido",
        type: "danger"
      })
      // console.log('El email no es válido');
    } else if (formData.password !== formData.repeatPassword) {
      showMessage({
        message: "Las contraseñas tienen que ser iguales",
        type: "danger"
      })
      // console.log('Las contraseñas tienen que ser iguales');
    } else if (size(formData.password) < 6) {
      showMessage({
        message: "La contraseña tiene que tener al menos 6 caracteres",
        type: "danger"
      })
      // console.log('La contraseña tiene tener al menos 6 caracteres');
    } else {
      setLoading(true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          showMessage({
            message: 'Usuario registrado correctamente',
            type: 'success'
          })
          navigation.navigate("account");
        })
        .catch(error => {
          // console.log(error);
          setLoading(false)
          showMessage({
            message: "El email ya está en uso",
            type: "danger"
          })
        })
    }
  }

  const onChange = (e, type) => {
    // console.log(type);
    // console.log(e.nativeEvent.text);
    // setFormData({
    //   [type]: e.nativeEvent.text
    // })
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text
    })
  }

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={e => onChange(e, 'email')}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={e => onChange(e, 'password')}
        rightIcon={
          <Icon
            type="material-community"
            name={
              showPassword ? "eye-off-outline" : "eye-outline"
            }
            iconStyle={styles.iconRight}
            onPress={() => { setShowPassword(!showPassword) }}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={e => onChange(e, 'repeatPassword')}
        rightIcon={
          <Icon
            type="material-community"
            name={
              showRepeatPassword ? "eye-off-outline" : "eye-outline"
            }
            iconStyle={styles.iconRight}
            onPress={() => { setShowRepeatPassword(!showRepeatPassword) }}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta"/>
    </View>
  )
};

const defaultFormValue = () => {
  return {
    email: '',
    password: '',
    repeatPassword: ''
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 0,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680"
  },
  iconRight: {
    color: "#c1c1c1"
  }
})

export default RegisterForm;