import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const images = [
  {
    src: require('../../../images/Screenshot 2024-06-10 163848.jpg'), 
    heading: 'ZAB E-FEST',
    description: 'Description for Image 1'
  },
  {
    src: require('../../../images/1714861596944.jpeg'), 
    heading: 'ZAB Tech Summit',
    description: 'Description for Image 2'
  },
  {
    src: require('../../../images/images.jpeg'), 
    heading: 'ZAB Hackathon',
    description: 'Description for Image 3'
  }
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          style={styles.imageContainer}
          // onPress={() => navigation.navigate('Details', { image })}
        >
          <Image source={image.src} style={styles.image} />
          <Text style={styles.heading}>{image.heading}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  heading: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default HomeScreen;
