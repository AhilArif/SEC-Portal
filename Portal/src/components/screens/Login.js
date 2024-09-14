import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import loginbg from '../../../assets/loginbg.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const navigation = useNavigation();
  const [fdata, setFdata] = useState({ email: '', password: '' });
  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    if (fdata.email === 'admin' || fdata.password === 'admin123') {
      Alert.alert('Success', 'Admin logged in successfully!');
      navigation.navigate('Dashboard');
      return;
    }

    fetch('http://10.0.2.2:3000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fdata),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => { throw err; });
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setErrormsg(data.error);
        } else {
          console.log('logged-in: ',data);
          Alert.alert('Success', 'Loged-in Successfully!');
          navigation.navigate('MainScreen');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrormsg('Invalid username or password');
      });
  };

// const LoginPage = () => {
//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');

//   const Sendtobackend = () => {
//     if (name === 'admin' && password === 'admin123') {
//       navigation.navigate('Dashboard');
//     } else if (name === 'user' && password === 'user123') {
//       navigation.navigate('MainScreen');
//     } else {
//       Alert.alert('Error', 'Invalid username or password');
//     }
//     setName('');
//     setPassword('');
//   };
  
  return (
    <View style={styles.container} >
            
      <Image style={styles.loginbg} source={loginbg} />
    
    <View style={styles.container1}>
      <Text style={styles.title}>LOGIN HERE!</Text>
      {errormsg ? <Text style={styles.errorText}>{errormsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setFdata({ ...fdata, email: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setFdata({ ...fdata, password: text})}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={Sendtobackend}>
        <Text style={styles.buttonText}>Login</Text>
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
    borderRadius: 20,
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
  errorText: {
    color: 'white',
    marginBottom: 15,
    fontSize: 17,
  },
  loginbg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -1,
    opacity: 0.9,
  }
});

export default LoginPage;
