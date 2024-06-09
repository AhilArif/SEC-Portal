import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

// Import the profile image from the assets folder
import ProfileImage from '../../../../images/sccthrewurcloths-lozge7.jpeg'; // Adjust the path to match the location of your image file

const AdminProfileScreen = ({ navigation }) => {
  // Sample user data (replace with actual user data)
  const user = {
    name: 'Admin',
    email: 'admin@szabist.pk',
  };

  const handleLogout = () => {
    // Display the confirmation dialog
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
            // Perform logout action (e.g., clear authentication state)
            // Navigate to the login screen or perform any other required actions
            navigation.navigate('Welcome'); // Navigate to the login screen after logout
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Display the profile image from the local folder */}
      <Image source={ProfileImage} style={styles.profileImage} />

      {/* User name */}
      <Text style={styles.name}>{user.name}</Text>

      {/* Email address */}
      <Text style={styles.email}>{user.email}</Text>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of the width and height for a circular image
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
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AdminProfileScreen;
