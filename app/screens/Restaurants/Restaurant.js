import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Restaurant = (props) => {
  const { route } = props;
  const { params } = route;
  const { name } = params;

  console.log(name);
  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

});

export default Restaurant;