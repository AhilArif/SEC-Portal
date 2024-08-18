import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import loginbg from '../../../assets/loginbg.png'
// Import the profile image from the assets folder
import ProfileImage from '../../../images/sccthrewurcloths-lozge7.jpeg'; // Adjust the path to match the location of your image file

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Ahil Arif',
    email: 'bscs2012372@szabist.pk',
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Welcome'); 
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
        <Image style={styles.loginbg} source={loginbg} />
    <View style={styles.container1}>
      <Image source={ProfileImage} style={styles.profileImage} />

      <Text style={styles.name}>{user.name}</Text>

      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'pink'
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginbg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    opacity: 0.9,
  }
});

export default ProfileScreen;