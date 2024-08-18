import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import loginbg from '../../../assets/loginbg.png'

const SignupPage = () => {
  const navigation = useNavigation();

  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    console.log(fdata);
    if (fdata.name === '' || fdata.email === '' || fdata.password === '') {
      setErrormsg('All fields are required!');
      return;
    } else {
      fetch('http://10.0.2.2:3000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fdata),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json()
        })
        .then((json) => {
          console.log('Response Text:', json);
          const data = json
          console.log(data);
          if (data.error) {
            setErrormsg(data.error);
          } else {
            Alert.alert('Success', 'Account Created Successfully!');
            navigation.navigate('Verification',{userdata: data.udata});
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrormsg('Failed to create an account. Please try again later.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.loginbg} source={loginbg} />
    <View style={styles.container1}>
      <Text style={styles.title}>Sign Up</Text>

      {errormsg ? <Text style={styles.errorText}>{errormsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setFdata({ ...fdata, name: text })}
        value={fdata.name}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setFdata({ ...fdata, email: text })}
        value={fdata.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setFdata({ ...fdata, password: text })}
        value={fdata.password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={Sendtobackend}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
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
    borderRadius: 20,
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
  },
});

export default SignupPage;
