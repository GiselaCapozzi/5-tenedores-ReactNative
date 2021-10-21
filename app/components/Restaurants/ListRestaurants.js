import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { size } from 'lodash';

const ListRestaurants = (props) => {
  const { restaurants } = props;

  return (
    <View>
      {
        size(restaurants) > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={(restaurant) =>
              <Restaurant
                restaurant={restaurant}
              />
            }
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.loaderRestaurants}>
            <ActivityIndicator
              size='large'
              color='#00a680'
            />
            <Text>Cargando restaurantes</Text>
          </View>
        )
      }
    </View>
  )
}

const Restaurant = (props) => {
  const { restaurant } = props

  return (
    <View>
      <Text>Restaurante</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center'
  }
});

export default ListRestaurants;