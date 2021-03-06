import React from "react";
import { Image } from 'react-native-elements';
import Carousel from "react-native-snap-carousel";

const Carusel = (props) => {
  const {
    arrayImages,
    height,
    width } = props;

    const renderItem = ({ item }) => {
      return <Image 
        style={{width, height}}
        source={{uri: item}}

      />
    }

  return (
    <Carousel
      layout={'default'}
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  )
}

export default Carusel;