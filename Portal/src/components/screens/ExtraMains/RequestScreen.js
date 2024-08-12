import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function RequestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NO REQUEST AT THE MOMENT! OR CONNECT TO DATABASE</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ccontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})