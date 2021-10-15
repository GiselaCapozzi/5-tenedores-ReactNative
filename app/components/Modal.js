import React from 'react'
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

const Modal = (props) => {
  const { isVisible, setIsVisible, children } = props;

  const closeModal = () => setIsVisible(false);

  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {
        children
      }
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#fff",
    height: "auto",
    width: "90%",
    
  }
})

export default Modal;