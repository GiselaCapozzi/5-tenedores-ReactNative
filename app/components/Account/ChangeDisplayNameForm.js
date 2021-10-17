import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

const ChangeDisplayNameForm = (props) => {
  const { displayName, setShowModal } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = () => {
   setError(null);
   if(!newDisplayName) {
     setError('El nombre no puede estar vacio');
   } else if(displayName === newDisplayName) {
     setError('El nombre no puede ser igual al actual');
   } else {
     console.log('OK!');
   }
  }

  // const onChange = (e, type) => {
  //   e.prevDefault();
    
  // }

  return(
    <View style={styles.view}>
      <Input 
        placeholder='Nombre y apellidos'
        containerStyle={styles.input}
        rightIcon={{
          type: 'material-community',
          name: 'account-circle-outline',
          color: '#c2c2c2'
        }}
        defaultValue={
          displayName || ''
        }
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button 
        title='Cambiar nombre'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
    </View>
  )
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

export default ChangeDisplayNameForm;