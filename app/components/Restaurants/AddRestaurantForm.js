import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';
import { map, size, filter } from 'lodash';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import Modal from '../Modal';
import { LOCATION_BACKGROUND } from "expo-permissions";

const widthScreen = Dimensions.get('window').width;

const AddRestaurantForm = (props) => {
  const {
    setIsLoading,
    navigation
  } = props;

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setLocationRestaurant] = useState(null);


  const addRestaurant = () => {
    console.log('OK!');
    // console.log('restaurantName: ' + restaurantName);
    // console.log('restaurantAddress: ' + restaurantAddress);
    // console.log('restaurantDescription: ' + restaurantDescription);
    console.log(imagesSelected);
    console.log(locationRestaurant);
  }

  return (
    <ScrollView style={styles.scrollView}>
      <ImageRestaurant
        imagenRestaurant={imagesSelected[0]}
      />
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
        setIsVisibleMap={setIsVisibleMap}
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
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationRestaurant={setLocationRestaurant}
      />
    </ScrollView>
  )
}

const ImageRestaurant = (props) => {
  const { imagenRestaurant } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imagenRestaurant ?
            { uri: imagenRestaurant } :
            require('../../../assets/img/no-image.png')
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  )
}

const FormAdd = (props) => {
  const {
    setRestaurantName,
    setRestaurantAddress,
    setRestaurantDescription,
    setIsVisibleMap
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
        rightIcon={{
          type: 'material-community',
          name: 'google-maps',
          color: '#c2c2c2',
          onPress: () => setIsVisibleMap(true)
        }}
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

const Map = (props) => {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationRestaurant } = props;

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultLocation = await Location.requestBackgroundPermissionsAsync(
        LOCATION_BACKGROUND
      )
      const statusPermissions = resultLocation.status;
      // console.log(statusPermissions);

      if (statusPermissions !== 'granted') {
        showMessage({
          message: 'Tienes que aceptar los permisos de localización para crear un restaurante',
          type: 'warning',
          duration: 3000
        })
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        })
      }
    })()
  }, [])

  const confirmLocation = () => {
    setLocationRestaurant(location);
    showMessage({
      message: 'Localización guardada correctamente',
      type: 'success'
    });
    setIsVisibleMap(false);
  }

  return (
    <Modal
      isVisible={isVisibleMap}
      setIsVisible={setIsVisibleMap}
    >
      <View>
        {
          location && (
            <MapView
              style={styles.mapStyle}
              initialRegion={location}
              showsUserLocation={true}
              onRegionChange={region => setLocation(region)}
            >
              <MapView.Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude
                }}
                draggable
              />
            </MapView>
          )
        }
        <View style={styles.viewMapBtn}>
          <Button
            title='Guardar ubicación'
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title='Cancelar ubicación'
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  )
}

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

  const removeImage = (image) => {
    Alert.alert(
      'Eliminar imagen',
      '¿Estas seguro que quieres eliminar la imagen?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
            )
          }
        }
      ],
      {
        cancelable: false
      }
    )
  }

  return (
    <ScrollView
      horizontal
      style={styles.viewImages}
    >
      {
        size(imagesSelected) < 4 && (
          <Icon
            type='material-community'
            name='camera'
            color='#7a7a7a'
            containerStyle={styles.containerIcon}
            onPress={imageSelect}
          />
        )
      }

      {
        map(imagesSelected, (imageRestaurant, index) => (
          <Avatar
            key={index}
            style={styles.miniatureStyle}
            source={{ uri: imageRestaurant }}
            onPress={() => removeImage(imageRestaurant)}
          />
        ))
      }
    </ScrollView>
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
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: 'center',
    height: 200,
    marginBottom: 20
  },
  mapStyle: {
    width: '100%',
    height: 400
  },
  viewMapBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
    width: 130,
  },
  viewMapBtnCancel: {
    backgroundColor: '#a60d0d'
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
    width: 130
  },
  viewBtnSave: {
    backgroundColor: '#00a680'
  }
});

export default AddRestaurantForm;