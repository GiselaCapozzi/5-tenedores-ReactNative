import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favorites from "../screens/Favorites";

const Stack = createNativeStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name = "favoritos"
        component = {Favorites}
        options = {{ title: "Restaurantes Favoritos" }}
      />
    </Stack.Navigator>
  )
};

export default FavoritesStack;