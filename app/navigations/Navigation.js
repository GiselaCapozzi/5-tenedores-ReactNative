import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import RestaurantsStack from './RsetaurantsStack';
import FavoritesStack from './FavoritesStack';
import TopRestaurantsStack from './TopRestaurantsStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
         screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          headerShown: false,
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",
        })}
        initialRouteName="restaurants"
      >
        <Tab.Screen 
          name = "restaurants"
          component = {RestaurantsStack}
          options = {{ title: "Restaurantes" }}
        />
        <Tab.Screen 
          name = "favorites"
          component = {FavoritesStack}
          options = {{ title: "Favoritos" }}
        />
        <Tab.Screen 
          name = "top-restaurants"
          component = {TopRestaurantsStack}
          options = {{ title: "Top 5" }}
        />
        <Tab.Screen 
          name = "search"
          component = {SearchStack}
          options = {{ title: "Buscar" }}
        />
        <Tab.Screen 
          name = "account"
          component = {AccountStack}
          options = {{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
};

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline"
      break;
    case "favorites":
      iconName = "heart-outline"
      break;
    case "top-restaurants":
      iconName = "star-outline"
      break;
    case "search":
      iconName = "magnify"
      break;
    case "account":
      iconName = "home-outline"
    break;  
    default:
      break;
  }
  return (
    <Icon 
      type="material-community"
      name = {iconName}
      size = {22}
      color = {color}
    />
  )
}

export default Navigation;