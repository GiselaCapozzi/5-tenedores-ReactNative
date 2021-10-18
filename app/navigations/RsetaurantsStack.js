import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Restaurants from '../screens/Restaurants/Restaurants';
import AddRestaurant from '../screens/Restaurants/AddRestaurant';

const Stack = createNativeStackNavigator();

const RestaurantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurantes"
        component={Restaurants}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name='add-restaurant'
        component={AddRestaurant}
        options={{ title: 'Añadir nuevo restaurante' }}
      />
    </Stack.Navigator>
  )
};

export default RestaurantsStack;