import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

const ChangePasswordForm = (props) => {
  const {
    password,
    setShowModal
  } = props;

  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNueva, setShowPasswordNueva] = useState(false);
  const [showRepetirContraseña, setShowRepetirContraseña] = useState(false);
  const [formData, setFormData] = useState(defaultValue());

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text
    })
  }

  const onSubmit = () => {
    console.log(formData);
  }

  return (
    <View style={styles.view}>
      <Input 
        placeholder='Contraseña actual'
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPasswordActual ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPasswordActual ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: () => setShowPasswordActual(!showPasswordActual)
        }}
        onChange={(e) => onChange(e, 'password')}
      />
      <Input 
        placeholder='Nueva contraseña'
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPasswordNueva ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showPasswordNueva ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: () => setShowPasswordNueva(!showPasswordNueva)
        }}
        onChange={(e) => onChange(e, 'newPassword')}
      />
      <Input 
        placeholder='Repetir nueva contraseña'
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showRepetirContraseña ? false : true}
        rightIcon={{
          type: 'material-community',
          name: showRepetirContraseña ? 'eye-off-outline' : 'eye-outline',
          color: '#c2c2c2',
          onPress: () => setShowRepetirContraseña(!showRepetirContraseña)
        }}
        onChange={(e) => onChange(e, 'repeatNewPassword')}
      />
      <Button 
        title='Cambiar contraseña'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
    </View>
  )
}

const defaultValue = () => {
  return {
    password: '',
    newPassword: '',
    repeatNewPassword: ''
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: '95%'
  },
  btn: {
    backgroundColor: '#00a680'
  }
})

export default ChangePasswordForm;