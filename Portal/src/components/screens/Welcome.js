import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import trail from '../../../assets/trail.gif'
import seclogo from '../../../assets/seclogo.png'
import Bunty from '../../common/button'

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.loginbg} source={trail} />
      <View style={styles.container1}> 
        <Image style={styles.seclogo} source={seclogo}/>
        <Bunty/>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        width: '100%',
       height: '100%',
    },
    loginbg: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: -1,
        opacity: 0.4,
   },
   container1: {
    display: 'flex',
    justifyContent: 'center',
    //alignItems: 'center',
    height: '100%',
   },
})