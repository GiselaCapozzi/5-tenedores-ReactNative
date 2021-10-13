import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from "../screens/Search";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name = "buscador"
        component = {Search}
        options = {{ title: "Buscador" }}
      />
    </Stack.Navigator>
  )
};

export default SearchStack;