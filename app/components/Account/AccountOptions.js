import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { map } from 'lodash';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

const AccountOptions = (props) => {
  const { userInfo, setReloadUserInfo } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setReenderComponent] = useState(null);
  // console.log(userInfo);

  const selectedComponent = (key) => {
    switch (key) {
      case  'displayName':
        setReenderComponent(
        <ChangeDisplayNameForm 
          displayName={userInfo.displayName}
          setShowModal={setShowModal}
          setReloadUserInfo={setReloadUserInfo}
        />
        );
        setShowModal(true);
        break;
      case 'email':
        setReenderComponent(
          <ChangeEmailForm 
            email={userInfo.email}
            setShowModal={setShowModal}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case 'password':
        setReenderComponent(
          <ChangePasswordForm 
            password={userInfo.password}
            setShowModal={setShowModal}
          />
        );
        setShowModal(true);
        break;
      default:
        setReenderComponent(null);
        setShowModal(false)
        break;
    }
  }
  const menuOptions = generateOptions(selectedComponent);
  
  return (
    <View style={styles.container}>
      {
        map(menuOptions, (menu, index) => (
          <ListItem 
            key={index} 
            bottomDivider
            onPress={menu.onPress}
          >
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <ListItem.Title
                style={styles.text}
              >
                <ListItem.Chevron
                  type={menu.iconType}
                  name={menu.iconNameLeft}
                  color={menu.iconColorLeft}
                />
                {menu.title}
                <ListItem.Chevron
                  type={menu.iconType}
                  name={menu.iconNameRight}
                  color={menu.iconColorRight}
                />
              </ListItem.Title>
            </View>
          </ListItem>
        ))
      }
      {
        renderComponent ? (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {renderComponent}
        </Modal>
        ) : 
        null
      }
    </View>
  )
};

const generateOptions = (selectedComponent) => {
  return [
    {
      title: "Cambiar Nombre y Apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent('displayName')
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent('email')
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent('password')
    },
  ]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 12,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
})

export default AccountOptions;