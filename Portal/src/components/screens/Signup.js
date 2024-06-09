import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const SignupPage = () => {
  const navigation = useNavigation(); // Initialize navigation
  
  //Database

  const [fdata,setFdata] = useState({
    name:'',
    email:'',
    password:'',
  })

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    //console.log(fdata);
    if(fdata.name == '' || fdata.email == '' || fdata.password == ''){
      setErrormsg('All fields are required!');
    return;
    }
    else {
      fetch('http://10.0.2.2.:3000/signup',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(fdata)
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {errormsg ? <Text style={styles.errorText}>{errormsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setFdata({ ...fdata, name: text})}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setFdata({...fdata, email: text})}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setFdata({...fdata, password: text})}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={Sendtobackend}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
  errorText: {
    color: 'red',
    marginBottom: 15,
    fontSize: 17,
  },
});

export default SignupPage;
