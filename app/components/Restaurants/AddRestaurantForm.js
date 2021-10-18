import React from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';

const AddRestaurantForm = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd />
    </ScrollView>
  )
}

const FormAdd = (props) => {
  return (
    <View style={styles.viewForm}>
      <Input 
        placeholder='Nombre del restaurante'
        containerStyle={styles.input}
      />
      <Input 
        placeholder='Direccion'
        containerStyle={styles.input}
      />
      <Input 
        placeholder='Descripción del restaurante'
        multiline={true}
        inputContainerStyle={styles.textArea}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: '100%'
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: '100%',
    padding: 0,
    margin: 0
  }
});

export default AddRestaurantForm;