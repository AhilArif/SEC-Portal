import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Using useNavigation hook to get the navigation object

  const handleLoginPress = () => {
    if (name === 'Aahil' && password === 'deerani') {
      console.log('Welcome to main screen');
      navigation.navigate('MainScreen'); // Navigating to MainScreen if username and password match
    } 
    else if (name === 'admin' && password === 'admin123') {
      console.log('Welcome to Admin Dashboard');
      navigation.navigate('Dashboard'); // Navigating to MainScreen if username and password match
    }  
    else {
      console.log('Invalid username or password');
    } 
    setName('');
    setPassword('');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN HERE!</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    //fontWeight: 'bold',
  },
});

export default LoginPage;
