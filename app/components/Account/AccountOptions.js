import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { map } from 'lodash';

const AccountOptions = (props) => {
  const { userInfo } = props;
  const menuOptions = generateOptions();
  
  return (
    <View>
      {
        map(menuOptions, (menu, index) => (
          <ListItem key={index}>
            <ListItem.Content>
              <ListItem.Title>{menu.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
};

const generateOptions = () => {
  return [
    {
      title: "Cambiar Nombre y Apellido",
    },
    {
      title: "Cambiar Email",
    },
    {
      title: "Cambiar contraseña",
    },
  ]
}

const styles = StyleSheet.create({

})

export default AccountOptions;