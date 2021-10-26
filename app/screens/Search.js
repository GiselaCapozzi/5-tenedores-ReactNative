import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { SearchBar, ListItem, Icon, Avatar } from 'react-native-elements';

import { FireSQL } from 'firesql';
import firebase from 'firebase/app';

const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id'});

// Buscador
const Search = (props) => {
const { navigation } = props;
const [search, setSearch] = useState('');
const [restaurants, setRestaurants] = useState([]);

useEffect(() => {
  setRestaurants([])
  if (search) {
    fireSQL
    .query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
    .then((response) => {
      setRestaurants(response)
    })
  }
}, [search])

  return (
    <View>
      <SearchBar 
        placeholder='Busca tu restaurante...'
        onChangeText={(e) => setSearch(e)}
        containerStyle={styles.searchBar}
        value={search}
      />
      {
        restaurants.length === 0 || restaurants === '' ? (
          <NoFoundRestaurants />
        ) : (
          <FlatList
          data={restaurants}
          renderItem={(restaurant) => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        )
      }
    </View>
  )
};

const NoFoundRestaurants = () => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ 
          width: 200, 
          height: 200 }}
      />
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, name, images } = restaurant.item;

  return (
    <ListItem
      onPress={() => navigation.navigate('restaurants', { screen: 'restaurant', params: { id, name } })}
    >
      <Avatar 
        source={images[0] ? {uri: images[0]} :
      require('../../assets/img/no-image.png')}
      />
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <ListItem.Title>
        {name}
      </ListItem.Title>
      <ListItem.Chevron />
      </View>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20
  }
});

export default Search;