import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Restaurants from '../screens/Restaurants';

const Stack = createNativeStackNavigator();

const RestaurantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name = "restaurantes"
        component = {Restaurants}
        options = {{ title: "Restaurantes" }}
      />
    </Stack.Navigator>
  )
};

export default RestaurantsStack;