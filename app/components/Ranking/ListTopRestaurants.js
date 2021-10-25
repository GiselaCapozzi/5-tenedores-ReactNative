import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, Image, Icon, Ranking } from 'react-native-elements';

const ListTopRestaurants = (props) => {
  const { restaurants, navigation } = props;

  return (
    <FlatList 
      data={restaurants}
      renderItem={(restaurant) => <Restaurant 
        restaurant={restaurant}
        navigation={navigation}
      />}
      keyExtractor={(item, index) => index.toString()}
    />
  )
};

const Restaurant = (props) => {
  const { restaurant, navigation } = props;
  const { name, rating } = restaurant.item;

  return (
    <View>
      <Text>{name}</Text>
      <Text>{rating}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

}); 

export default ListTopRestaurants
