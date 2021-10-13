import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopRestaurants from '../screens/TopRestaurants';

const Stack = createNativeStackNavigator();

const TopRestaurantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name = "top-restaurantes"
        component = {TopRestaurants}
        options = {{ title: "Los Mejores Restaurantes" }}
      />
    </Stack.Navigator>
  )
};

export default TopRestaurantsStack;