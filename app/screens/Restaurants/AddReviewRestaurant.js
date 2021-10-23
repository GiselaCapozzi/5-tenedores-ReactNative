import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AddReviewRestaurant = (props) => {
  const { navigation, route } = props;
  const { idRestaurant } = route.params;

  return (
    <View>
      <Text>AddReviewRestaurant</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
});

export default AddReviewRestaurant