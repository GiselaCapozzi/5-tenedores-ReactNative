import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message'

const AddRestaurantForm = (props) => {
  const {
    setIsLoading,
    navigation
  } = props;

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [imagesSelected, setImagesSelected] = useState([]);

  
  const addRestaurant = () => {
    console.log('OK!');
    // console.log('restaurantName: ' + restaurantName);
    // console.log('restaurantAddress: ' + restaurantAddress);
    // console.log('restaurantDescription: ' + restaurantDescription);
    console.log(imagesSelected);
  }

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
      />
      <UploadImage
        setImagesSelected={setImagesSelected}
        imagesSelected={imagesSelected}
      />
      <Button
        title='Crear restaurante'
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  )
}

const FormAdd = (props) => {
  const {
    setRestaurantName,
    setRestaurantAddress,
    setRestaurantDescription
  } = props

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder='Nombre del restaurante'
        containerStyle={styles.input}
        onChange={e => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder='Direccion'
        containerStyle={styles.input}
        onChange={e => setRestaurantAddress(e.nativeEvent.text)}
      />
      <Input
        placeholder='Descripción del restaurante'
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={e => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  )
};

const UploadImage = (props) => {
  const {
    setImagesSelected,
    imagesSelected
  } = props;

  const imageSelect = async () => {
    const resultPermission = await Camera.requestPermissionsAsync();

    if (resultPermission === 'denied') {
      showMessage({
        message: 'Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir a ajustes y activarlos manualmente.',
        type: 'warning',
        duration: 3000
      })
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        showMessage({
          message: 'Has cerrado la galeria sin seleccionar ninguna imagen',
          type: 'info',
          duration: 2000
        })
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  }

  return (
    <View style={styles.viewImages}>
      <Icon
        type='material-community'
        name='camera'
        color='#7a7a7a'
        containerStyle={styles.containerIcon}
        onPress={imageSelect}
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
  },
  btnAddRestaurant: {
    backgroundColor: '#00a680',
    margin: 20
  },
  viewImages: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: '#e3e3e3'
  }
});

export default AddRestaurantForm;