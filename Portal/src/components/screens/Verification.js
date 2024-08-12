import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import loginbg from '../../../assets/loginbg.png'

const Verification = ({ navigation, route }) => {
  const { userdata } = route.params;

  const [errormsg, setErrormsg] = useState(null);
  const [userCode, setUserCode] = useState('XXXX');
  const [actualCode, setActualCode] = useState(null);

  useEffect(() => {
      setActualCode(userdata[0]?.VerificationCode);
  }, [])

  const Sendtobackend = () => {
      // console.log(userCode);
      // console.log(actualCode);

      if (userCode == 'XXXX' || userCode == '') {
          setErrormsg('Please enter the code');
          return;
      }

      else if (userCode == actualCode) {
          // console.log('correct code');
          const fdata = {
              email: userdata[0]?.email,
              password: userdata[0]?.password,
              name: userdata[0]?.name,
          }

          fetch('http://10.0.2.2.:3000/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(fdata)
          })
              .then(res => res.json())
              .then(data => {
                  // console.log(data);
                  if (data.message === 'User Registered Successfully') {
                      alert(data.message);
                      navigation.navigate('login')
                  }
                  else {
                      alert("Something went wrong !! Try Signing Up Again");

                  }
              })
      }
      else if (userCode != actualCode) {
          setErrormsg('Incorrect code');
          return;
      }


  }

  return (
    <View style={styles.container} >
            
      <Image style={styles.loginbg} source={loginbg} />
    
    <View style={styles.container1}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.title2}>Please Enter the Verification Code sent to the email you've registered!</Text>
      {errormsg ? <Text style={styles.errorText}>{errormsg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Enter Code"
        onChangeText={(text) => setUserCode({ text})}
        onPressIn={() => setErrormsg(null)}
      />

      <TouchableOpacity style={styles.button} onPress={Sendtobackend}>
        <Text style={styles.buttonText}>Submit</Text>
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
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    color: 'red',
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

export default Verification;
