import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';

const InfoUser = (props) => {
  const { userInfo } = props;
  console.log(userInfo);

  return (
    <View style={styles.viewUserInfo}>
      <Avatar 
        rounded
        size="large"
        showEditButton
        containerStyle={styles.userInfoAvatar}
      >
        <Avatar.Accessory 
          size={30}
        />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          Gisela Elisabeth Capozzi
        </Text>
        <Text>gise@gmail.com</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20,
    backgroundColor: "grey"
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
})

export default InfoUser;