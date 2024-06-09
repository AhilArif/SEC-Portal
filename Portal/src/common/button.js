import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const Bunty = () => {

   const navigationLogin = useNavigation();
  const navigationSignup = useNavigation();

  const handleLoginPress = () => {
    navigationLogin.navigate('Login');
    console.log('Login Pressed.. Moving to Login Page');
  };

  const handleSignupPress = () => {
    navigationSignup.navigate('Signup');
    console.log('Register Pressed.. Moving to Register Page');
  };

 return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.button} onPress={(handleLoginPress) } >
            <Text style={styles.buttonText}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={(handleSignupPress) } >
            <Text style={styles.buttonText}>Register</Text>
         </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 50,
    marginLeft: 50,
    marginTop: 70,
    color: 'white',
    //zIndex: -1,
      // backgroundColor: 'black',
   },
 button: {
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 60,
      marginTop: 10,
      borderRadius: 20,
   },
 buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
   },
});
export default Bunty;