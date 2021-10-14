import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from "firebase";
// import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';

const InfoUser = (props) => {
  const { userInfo: {
    photoURL,
    displayName,
    email
  } } = props;

  const changeAvatar = async () => {
    const resultPermission = await Camera.requestCameraPermissionsAsync();
    const resultPermissionCamera = resultPermission.status;
    
    if(resultPermissionCamera === 'denied') {
      showMessage({
        message: 'Es necesario aceptar los permisos de la galeria',
        type: 'info'
      })
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })
      console.log(result);
    }
  }

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        containerStyle={styles.userInfoAvatar}
        source={
          photoURL ? { uri: photoURL }
            : require('../../../assets/img/avatar-default.jpg')
        }
      >
        <Avatar.Accessory
          size={30}
          onPress={changeAvatar}
        />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
         {
           displayName ? displayName : "Anónimo"
         }
        </Text>
        <Text>
          {
            email ? email : "Social Login"
          }
        </Text>
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
    // backgroundColor: "grey"
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
})

export default InfoUser;