import React, { useState, useRef } from 'react'
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm';

const AddRestaurant = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const flashRef = useRef();

  return (
    <View>
      <AddRestaurantForm
        flashRef={flashRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <FlashMessage option='center' />
      <Loading isVisible={isLoading} text='Creando restaurante' />
    </View>
  )
};

export default AddRestaurant;