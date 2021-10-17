import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from "react-native-elements";

const ChangeEmailForm = (props) => {
  const {
    email,
    setShowModal,
    setReloadUserInfo } = props;
  const [formData, setFormData] = useState(defaultValue());

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text
    })
  }

  const onSubmit = () => {
    console.log('Formulario enviado');
    console.log(formData);
  }

  return (
    <View style={styles.view}>
      <Input
        placeholder='Correo electronico'
        containerStyle={styles.input}
        defaultValue={email || ''}
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2'
        }}
        onChange={e => onChange(e, 'email')}
      />
      <Input 
        placeholder='Contraseña'
        containerStyle={styles.input}
        password={true}
        secureTextEntry={true}
        rightIcon={{
          type: 'material-community',
          name: 'eye-outline',
          color: '#c2c2c2'
        }}
        onChange={e => onChange(e, 'password')}
      />
      <Button 
        title='Cambiar email'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
    </View>
  )
}

const defaultValue = () => {
  return {
    email: '',
    password: ''
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
    width:'95%'
  },
  btn: {
    backgroundColor: '#00a680'
  }
})

export default ChangeEmailForm;